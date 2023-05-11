import React from 'react'
import { Input, UpgradeSelections, buyers, makers, sellers, useLocalStorage, utility } from '../components'

interface UpgradesPageProps {}

export const UpgradesPage: React.FC<UpgradesPageProps> = () => {
    const [factory, setFactory] = useLocalStorage('factory', 'A')
    const [current, setCurrent] = useLocalStorage(factory, new Array(37).fill(0))
    const [proposed, setProposed] = React.useState<number[]>(current)

    const [money, setMoney] = useLocalStorage('money', '')
    const [income, setIncome] = useLocalStorage('income', '')
    const [tickrate, setTickrate] = useLocalStorage('tickrate', 5)

    return (
        <div className='mx-20 mb-40 mt-8'>
            <h1 className='text-2xl font-bold'>Cost for Upgrades</h1>

            <FactoryButtons factory={factory} setFactory={setFactory} />

            <h2 className='mt-2 text-lg font-semibold'>Current Upgrades</h2>
            <UpgradeSelections value={current} setter={setCurrent} />
            <ResetButton levels={current} resetter={setCurrent} />

            <hr className='my-8' />

            <h2 className='mt-2 text-lg font-semibold'>Proposed Upgrades</h2>
            <UpgradeSelections value={proposed} setter={setProposed} />
            <ResetButton levels={proposed} other={current} resetter={setProposed} />

            <hr className='my-8' />

            <h2 className='mt-2 text-lg font-semibold'>What it'll cost</h2>
            <div className='flex flex-col gap-1'>
                <span>{`You still need: $${prettyPrintNumb(
                    calculateTotalCosts(proposed) - calculateTotalCosts(current)
                )}`}</span>
                <Input
                    label='Money:'
                    before='$'
                    value={money}
                    onChange={info => {
                        if (info.value.match(/^(|[0-9]*\.?[0-9]*(K|M|B|t|q)?)$/)) setMoney(info.value)
                    }}
                />
                <Input
                    label='Income:'
                    before='$'
                    after='/tick'
                    value={income}
                    onChange={info => {
                        if (info.value.match(/^(|[0-9]*\.?[0-9]*(K|M|B|t|q)?)$/)) setIncome(info.value)
                    }}
                />
                <div className='flex items-center'>
                    <span>Ticks/second: </span>
                    <select
                        value={tickrate}
                        onChange={ev => setTickrate(parseInt(ev.target.value))}
                        className='rounded border-gray-400 py-0'
                    >
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                    </select>
                </div>
                <div>{`It will take ${prettyPrintTimeUntil(
                    tickrate,
                    income,
                    calculateTotalCosts(proposed) - calculateTotalCosts(current),
                    money
                )}`}</div>
            </div>
        </div>
    )
}

interface ResetButtonProps {
    levels: number[]
    other?: number[]
    resetter: (_: number[]) => void
}

export const ResetButton: React.FC<ResetButtonProps> = ({ levels, other, resetter }) => (
    <div className='flex w-full justify-between'>
        <span>{`Total cost: $${prettyTotalCost(levels)}`}</span>
        <div className='flex gap-2'>
            {other && (
                <button
                    className='rounded border border-gray-300 px-2.5 py-0.5 text-gray-600 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-500'
                    onClick={() => resetter(other)}
                >
                    Copy from Above
                </button>
            )}
            <button
                className='rounded border border-gray-300 px-2.5 py-0.5 text-gray-600 hover:border-red-300 hover:bg-red-100 hover:text-red-500'
                onClick={() => resetter(new Array(37).fill(0))}
            >
                Reset
            </button>
        </div>
    </div>
)

interface FactoryButtonsProps {
    factory: string
    setFactory: (_: string) => void
}

export const FactoryButtons: React.FC<FactoryButtonsProps> = ({ factory, setFactory }) => (
    <div className='text-gray-700'>
        <span>Factory: </span>
        <button
            data-select={factory}
            onClick={() => setFactory('A')}
            className='px-2 hover:italic data-[select=A]:font-bold'
        >
            A
        </button>
        |
        <button
            data-select={factory}
            onClick={() => setFactory('B')}
            className='px-2 hover:italic data-[select=B]:font-bold'
        >
            B
        </button>
        |
        <button
            data-select={factory}
            onClick={() => setFactory('C')}
            className='px-2 hover:italic data-[select=C]:font-bold'
        >
            C
        </button>
        |
        <button
            data-select={factory}
            onClick={() => setFactory('D')}
            className='px-2 hover:italic data-[select=D]:font-bold'
        >
            D
        </button>
        |
        <button
            data-select={factory}
            onClick={() => setFactory('E')}
            className='px-2 hover:italic data-[select=E]:font-bold'
        >
            E
        </button>
    </div>
)

const calculateCost = (s: string): number => {
    if (s === '-' || s === '') return 0

    let mult = 1
    let numb = s
    if (!s.at(-1)?.match(/[0-9]/)) {
        const abbreviation = s.at(-1) || ''
        if (!abbrevMap[abbreviation] && abbreviation !== '.') {
            console.log(`Recieved: '${s}' - the abbreviation '${abbreviation}' is not known`)
            return -1
        }
        mult = abbrevMap[abbreviation] || 1
        numb = s.substring(0, s.length - 1)
    }
    return parseFloat(numb) * mult
}

const calculateTotalCosts = (list: number[]): number => {
    let cost = 0
    list.forEach((level, id) => {
        if (id in utility) {
            cost += calculateCost(utility[id].levels[level])
        } else if (id in buyers) {
            cost += calculateCost(buyers[id].levels[level])
        } else if (id in makers) {
            cost += calculateCost(makers[id].levels[level])
        } else if (id in sellers) {
            cost += calculateCost(sellers[id].levels[level])
        }
    })
    return cost
}

const prettyTotalCost = (list: number[]): string => {
    const cost = calculateTotalCosts(list)
    return prettyPrintNumb(cost)
}

const goodRange = (n: number, lr: number = 1, ur: number = 1000): boolean => n >= lr && n < ur

const prettyPrintNumb = (n: number): string => {
    if (n < 0) {
        return '0'
    } else if (goodRange(n / abbrevMap.q)) {
        return `${n / abbrevMap.q}`.substring(0, 5) + ' quadrillion'
    } else if (goodRange(n / abbrevMap.t)) {
        return `${n / abbrevMap.t}`.substring(0, 5) + ' trillion'
    } else if (goodRange(n / abbrevMap.B)) {
        return `${n / abbrevMap.B}`.substring(0, 5) + ' billion'
    } else if (goodRange(n / abbrevMap.M)) {
        return `${n / abbrevMap.M}`.substring(0, 5) + ' million'
    } else {
        return `${n}`
    }
}

const abbrevMap: Record<string, number> = {
    K: 1000,
    M: 1000000,
    B: 1000000000,
    t: 1000000000000,
    q: 1000000000000000,
}

const calculateSecondsUntil = (tickrate: number, income: number, target: number, current: number = 0): number =>
    Math.ceil((target - current) / income / tickrate)

const prettyPrintTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) {
        return 'more information to work out how long...'
    } else if (seconds < 0) {
        return 'no more time at all!'
    } else if (goodRange(seconds, 0, 60)) {
        return `${Math.round((seconds + Number.EPSILON) * 100) / 100}` + ' seconds'
    } else if (goodRange(seconds / 60, 1, 60)) {
        return `${Math.round((seconds / 60 + Number.EPSILON) * 100) / 100}` + ' minutes'
    } else if (goodRange(seconds / 60 / 60, 1, 24)) {
        return `${Math.round((seconds / 60 / 60 + Number.EPSILON) * 100) / 100}` + ' hours'
    } else {
        return `${Math.round((seconds / 60 / 60 / 24 + Number.EPSILON) * 100) / 100}` + ' days'
    }
}

const prettyPrintTimeUntil = (tickrate: number, income: string, target: number, current: string = '-'): string =>
    prettyPrintTime(calculateSecondsUntil(tickrate, calculateCost(income), target, calculateCost(current)))
