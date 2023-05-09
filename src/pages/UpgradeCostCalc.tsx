import React from 'react'
import componentIcons from '../componentIcons.png'

interface UpgradesPageProps {}

export const UpgradesPage: React.FC<UpgradesPageProps> = () => {
    const [current, setCurrent] = React.useState<number[]>(new Array(37).fill(0))
    const [proposed, setProposed] = React.useState<number[]>(new Array(37).fill(0))

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
        </div>
    )
}

interface UpgradeProps {
    name: string
    iconPos: { x: number; y: number }
    levels: any[]
    data: { val: number; set: (_: number) => void }
}

export const Upgrade: React.FC<UpgradeProps> = ({ name, iconPos, levels, data }) => (
    <div>
        <span className='text-gray-700'>{`${name}: ${data.val}`}</span>

        <div className='flex'>
            {levels.map((_, idx) => (
                <button
                    key={`${name}-${idx}`}
                    className='relative m-[1px] flex h-[25px] w-[25px] items-end justify-end'
                    style={{
                        backgroundImage: `url(${componentIcons})`,
                        backgroundPosition: `-${26 * iconPos.x}px -${26 * iconPos.y}px`,
                    }}
                    onClick={() => data.set(idx)}
                >
                    {data.val >= idx && (
                        <div className='absolute left-0 top-0 h-full w-full rounded-sm bg-green-500 opacity-50' />
                    )}
                    <span className='rounded-sm bg-slate-700 px-[3px] text-[9px] font-bold text-white'>{idx}</span>
                </button>
            ))}
        </div>
    </div>
)

interface UpgradeSelectionsProps {
    value: number[]
    setter: (_: number[]) => void
}

export const UpgradeSelections: React.FC<UpgradeSelectionsProps> = ({ value, setter }) => (
    <>
        {[utility, buyers, makers, sellers].map(type => (
            <div
                key={crypto.randomUUID()}
                className='mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
            >
                {Object.values(type).map(upgrade => (
                    <Upgrade
                        key={crypto.randomUUID()}
                        {...upgrade}
                        data={{
                            val: value[upgrade.id],
                            set: (n: number) => {
                                let update = [...value]
                                update[upgrade.id] = n
                                setter(update)
                            },
                        }}
                    />
                ))}
            </div>
        ))}
    </>
)

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
    if (s === '-') return 0

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

type UpgradeT = {
    id: number
    name: string
    iconPos: { x: number; y: number }
    levels: string[]
}

const utility: Record<number, UpgradeT> = {
    0: {
        id: 0,
        name: 'Conveyor',
        iconPos: { x: 1, y: 0 },
        levels: ['-', '1t', '100t', '10q'],
    },
    1: { id: 1, name: 'Analytics Production', iconPos: { x: 4, y: 4 }, levels: ['-', '200B', '4q'] },
    2: {
        id: 2,
        name: 'Reaearch Paper Bonus',
        iconPos: { x: 3, y: 4 },
        levels: ['-', '500K', '50M', '500M', '11B', '28B', '120B', '940B', '200t', '1q', '1q'],
    },
    3: {
        id: 3,
        name: 'Max Stock Size',
        iconPos: { x: 3, y: 4 },
        levels: ['-', '500K', '100M', '1B', '3B', '9B', '400B', '50t', '600t'],
    },
    4: {
        id: 4,
        name: 'Garbage',
        iconPos: { x: 2, y: 3 },
        levels: ['-', '50K', '3B'],
    },
}

const buyers: Record<number, UpgradeT> = {
    5: {
        id: 5,
        name: 'Iron Ore Buyer',
        iconPos: { x: 2, y: 0 },
        levels: ['-', '800', '8K', '80K', '500K', '12B', '150B', '40t', '600t', '1q'],
    },
    6: {
        id: 6,
        name: 'Coal Buyer',
        iconPos: { x: 5, y: 0 },
        levels: ['-', '40K', '1800K', '1B', '6B', '300B', '125t'],
    },
    7: {
        id: 7,
        name: 'Oil Buyer',
        iconPos: { x: 8, y: 0 },
        levels: ['-', '900K', '300M', '4B', '300B'],
    },
    8: {
        id: 8,
        name: 'Gas Buyer',
        iconPos: { x: 0, y: 3 },
        levels: ['-', '1200K', '400M', '800M', '2B', '200B'],
    },
    9: {
        id: 9,
        name: 'Silicon Buyer',
        iconPos: { x: 1, y: 1 },
        levels: ['-', '800M', '1B', '500B', '30t'],
    },
    10: {
        id: 10,
        name: 'Explosives Buyer',
        iconPos: { x: 7, y: 1 },
        levels: ['-', '99B', '500B', '800t', '12q'],
    },
    11: {
        id: 11,
        name: 'Aluminium Buyer',
        iconPos: { x: 4, y: 1 },
        levels: ['-', '300B', '600B', '1500B', '100t', '6q'],
    },
}

const makers: Record<number, UpgradeT> = {
    12: {
        id: 12,
        name: 'Iron Foundry',
        iconPos: { x: 3, y: 0 },
        levels: ['-', '800', '80K', '800K', '7B', '200B', '60t', '600t', '2q'],
    },
    13: {
        id: 13,
        name: 'Steel Produced',
        iconPos: { x: 6, y: 0 },
        levels: ['-', '400B', '900t'],
    },
    14: {
        id: 14,
        name: 'Steel Foundry',
        iconPos: { x: 6, y: 0 },
        levels: ['-', '150K', '900K', '600B', '150t', '2.5q'],
    },
    15: {
        id: 15,
        name: 'Plastic Produced',
        iconPos: { x: 9, y: 0 },
        levels: ['-', '1t'],
    },
    16: {
        id: 16,
        name: 'Plastic Maker',
        iconPos: { x: 9, y: 0 },
        levels: ['-', '12M', '5B', '600B'],
    },
    17: {
        id: 17,
        name: 'Electronics Produced',
        iconPos: { x: 2, y: 1 },
        levels: ['-', '1500B'],
    },
    18: {
        id: 18,
        name: 'Electronics Maker',
        iconPos: { x: 2, y: 1 },
        levels: ['-', '400M', '3B'],
    },
    19: {
        id: 19,
        name: 'Bullet Maker',
        iconPos: { x: 8, y: 1 },
        levels: ['-', '220B', '600B', '350t'],
    },
    20: {
        id: 20,
        name: 'Gun Maker',
        iconPos: { x: 9, y: 1 },
        levels: ['-', '450B', '2500B', '900t'],
    },
    21: {
        id: 21,
        name: 'Engine Maker',
        iconPos: { x: 5, y: 1 },
        levels: ['-', '1300B', '4q'],
    },
    22: {
        id: 22,
        name: 'Tank Hull Maker',
        iconPos: { x: 1, y: 2 },
        levels: ['-', '600B', '1500B'],
    },
    23: {
        id: 23,
        name: 'Tank Turret Maker',
        iconPos: { x: 2, y: 2 },
        levels: ['-', '450B', '1t'],
    },
    24: {
        id: 24,
        name: 'Tank Assembler',
        iconPos: { x: 3, y: 2 },
        levels: ['-', '300B', '2t'],
    },
    25: {
        id: 25,
        name: 'Diesel Refinery',
        iconPos: { x: 5, y: 2 },
        levels: ['-', '900B'],
    },
    26: {
        id: 26,
        name: 'Jet Fuel Refinery',
        iconPos: { x: 1, y: 3 },
        levels: ['-', '700B'],
    },
    27: {
        id: 27,
        name: 'Rocket Hull Maker',
        iconPos: { x: 6, y: 2 },
        levels: ['-', '1500B'],
    },
    28: {
        id: 28,
        name: 'Warhead Maker',
        iconPos: { x: 7, y: 2 },
        levels: ['-', '2t'],
    },
    29: {
        id: 29,
        name: 'Rocket Assembler',
        iconPos: { x: 8, y: 2 },
        levels: ['-', '2500B'],
    },
}

const sellers: Record<number, UpgradeT> = {
    30: {
        id: 30,
        name: 'Iron Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '500', '2K'],
    },
    31: {
        id: 31,
        name: 'Steel Seller',
        iconPos: { x: 7, y: 0 },
        levels: ['-', '50K', '300K'],
    },
    32: {
        id: 32,
        name: 'Plastic Seller',
        iconPos: { x: 0, y: 1 },
        levels: ['-', '12M', '9500M'],
    },
    33: {
        id: 33,
        name: 'Electronics Seller',
        iconPos: { x: 3, y: 1 },
        levels: ['-', '200M', '2B'],
    },
    34: {
        id: 34,
        name: 'Gun Seller',
        iconPos: { x: 0, y: 2 },
        levels: ['-', '120B'],
    },
    35: {
        id: 35,
        name: 'Engine Seller',
        iconPos: { x: 6, y: 1 },
        levels: ['-', '800B'],
    },
    36: {
        id: 36,
        name: 'Tank Seller',
        iconPos: { x: 4, y: 2 },
        levels: ['-', '400B', '6200B'],
    },
}
