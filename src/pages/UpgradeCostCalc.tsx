import React from 'react'
import { UpgradeSelections, buyers, makers, sellers, utility } from '../components'

interface UpgradesPageProps {}

export const UpgradesPage: React.FC<UpgradesPageProps> = () => {
    const [current, setCurrent] = React.useState<number[]>(new Array(37).fill(0))
    const [proposed, setProposed] = React.useState<number[]>(new Array(37).fill(0))

    const [money, setMoney] = React.useState('')
    const [income, setIncome] = React.useState('')

    return (
        <div className='mx-20 mb-40 mt-8'>
            <h1 className='text-2xl font-bold'>Cost for Upgrades</h1>

            <h2 className='mt-2 text-lg font-semibold'>Current Upgrades</h2>
            <UpgradeSelections value={current} setter={setCurrent} />
            <ResetButton levels={current} resetter={setCurrent} />

            <hr className='my-8' />

            <h2 className='mt-2 text-lg font-semibold'>Proposed Upgrades</h2>
            <UpgradeSelections value={proposed} setter={setProposed} />
            <ResetButton levels={proposed} resetter={setProposed} />

            <hr className='my-8' />

            <h2 className='mt-2 text-lg font-semibold'>What it'll cost</h2>
            <span>{`You still need: $${calculateTotalCosts(proposed) - calculateTotalCosts(current)}`}</span>
            <div className='flex items-center'>
                <span className='mr-2'>How much money do you have?</span>
                $
                <input
                    type='text'
                    value={money}
                    onChange={ev => {
                        if (ev.target.value.match(/^(|[0-9]*\.?[0-9]*(K|M|B|t|q)?)$/)) setMoney(ev.target.value)
                    }}
                    className='rounded border-gray-400 p-0 px-2'
                />
            </div>
            <div className='flex items-center'>
                <span className='mr-2'>How much money do you make?</span>
                $
                <input
                    type='text'
                    value={income}
                    onChange={ev => {
                        if (ev.target.value.match(/^(|[0-9]*\.?[0-9]*(K|M|B|t|q)?)$/)) setIncome(ev.target.value)
                    }}
                    className='rounded border-gray-400 p-0 px-2'
                />
                /tick
            </div>
        </div>
    )
}

interface ResetButtonProps {
    levels: number[]
    resetter: (_: number[]) => void
}

export const ResetButton: React.FC<ResetButtonProps> = ({ levels, resetter }) => (
    <div className='flex w-full justify-between'>
        <span>{`Total cost: $${prettyTotalCost(levels)}`}</span>
        <button
            className='rounded border border-gray-300 px-2.5 py-0.5 text-gray-600 hover:border-red-300 hover:bg-red-100 hover:text-red-500'
            onClick={() => resetter(new Array(37).fill(0))}
        >
            Reset
        </button>
    </div>
)

const calculateCost = (s: string): number => {
    if (s === '-' || s === '') return 0

    let mult = 1
    let numb = s
    if (!s.at(-1)?.match(/[0-9]/)) {
        const abbreviation = s.at(-1) || ''
        if (!abbrevMap[abbreviation]) {
            console.log(`Recieved: '${s}' - the abbreviation '${abbreviation}' is not known`)
            return -1
        }
        mult = abbrevMap[abbreviation]
        numb = s.substring(0, s.length - 1)
    }
    console.log(s, mult, numb, parseInt(numb) * mult)
    return parseInt(numb) * mult
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

const prettyPrintNumb = (n: number): string => {
    const goodRange = (n: number, lr: number = 1, ur: number = 1000): boolean => n >= lr && n < ur
    if (goodRange(n / abbrevMap.q)) {
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
