import React from 'react'
import componentIcons from '../componentIcons.png'

interface UpgradesPageProps {}

export const UpgradesPage: React.FC<UpgradesPageProps> = () => {
    const [current, setCurrent] = React.useState<number[]>(new Array(36).fill(0))
    const [proposed, setProposed] = React.useState<number[]>(new Array(36).fill(0))

    return (
        <div className='mx-20 mt-8'>
            <h1 className='text-2xl font-bold'>Cost for Upgrades</h1>

            <h2 className='mt-2 text-lg font-semibold'>Current Upgrades</h2>
            {[utility, buyers, makers, sellers].map(type => (
                <div
                    key={crypto.randomUUID()}
                    className='mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
                >
                    {type.map(upgrade => (
                        <Upgrade
                            key={crypto.randomUUID()}
                            {...upgrade}
                            data={{
                                val: current[upgrade.id],
                                set: (n: number) => {
                                    let update = [...current]
                                    update[upgrade.id] = n
                                    setCurrent(update)
                                },
                            }}
                        />
                    ))}
                </div>
            ))}

            <hr />

            <h2 className='mt-2 text-lg font-semibold'>Proposed Upgrades</h2>
            {[utility, buyers, makers, sellers].map(type => (
                <div
                    key={crypto.randomUUID()}
                    className='mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
                >
                    {type.map(upgrade => (
                        <Upgrade
                            key={crypto.randomUUID()}
                            {...upgrade}
                            data={{
                                val: proposed[upgrade.id],
                                set: (n: number) => {
                                    let update = [...proposed]
                                    update[upgrade.id] = n
                                    setProposed(update)
                                },
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

interface UpgradeProps {
    name: string
    iconPos: { x: number; y: number }
    levels: any[]
    data: { val: number; set: (_: number) => void }
}

export const Upgrade: React.FC<UpgradeProps> = ({ name, iconPos, levels, data }) => {
    return (
        <div>
            <span>{name}</span>

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
}

const utility = [
    {
        id: 0,
        name: 'Conveyor',
        iconPos: { x: 1, y: 0 },
        levels: ['-', '1t', '100t', '10q'],
    },
    { id: 1, name: 'Analytics Production', iconPos: { x: 4, y: 4 }, levels: ['-', '200B', '4q'] },
    {
        id: 2,
        name: 'Reaearch Paper Bonus',
        iconPos: { x: 3, y: 4 },
        levels: ['-', '500K', '50M', '500M', '11B', '28B', '120B', '940B', '200t', '1q', '1q'],
    },
    {
        id: 3,
        name: 'Max Stock Size',
        iconPos: { x: 3, y: 4 },
        levels: ['-', '500K', '100M', '1B', '3B', '9B', '400B', '50t', '600t'],
    },
    {
        id: 4,
        name: 'Garbage',
        iconPos: { x: 2, y: 3 },
        levels: ['-', '50K', '3B'],
    },
]

const buyers = [
    {
        id: 5,
        name: 'Iron Ore Buyer',
        iconPos: { x: 2, y: 0 },
        levels: ['-', '800', '8K', '80K', '500K', '12B', '150B', '40t', '600t', '1q'],
    },
    {
        id: 6,
        name: 'Coal Buyer',
        iconPos: { x: 5, y: 0 },
        levels: ['-', '40K', '1800K', '1B', '6B', '300B', '125t'],
    },
    {
        id: 7,
        name: 'Oil Buyer',
        iconPos: { x: 8, y: 0 },
        levels: ['-', '900K', '300M', '4B', '300B'],
    },
    {
        id: 8,
        name: 'Gas Buyer',
        iconPos: { x: 0, y: 3 },
        levels: ['-', '1200K', '400M', '800M', '2B', '200B'],
    },
    {
        id: 9,
        name: 'Silicon Buyer',
        iconPos: { x: 1, y: 1 },
        levels: ['-', '800M', '1B', '500B', '30t'],
    },
    {
        id: 10,
        name: 'Explosives Buyer',
        iconPos: { x: 7, y: 1 },
        levels: ['-', '99B', '500B', '800t', '12q'],
    },
    {
        id: 11,
        name: 'Aluminium Buyer',
        iconPos: { x: 4, y: 1 },
        levels: ['-', '300B', '600B', '1500B', '100t', '6q'],
    },
]

const makers = [
    {
        id: 12,
        name: 'Iron Foundry',
        iconPos: { x: 3, y: 0 },
        levels: ['-', '800', '80K', '800K', '7B', '200B', '60t', '600t', '2q'],
    },
    {
        id: 13,
        name: 'Steel Produced',
        iconPos: { x: 6, y: 0 },
        levels: ['-', '400B', '900t'],
    },
    {
        id: 14,
        name: 'Steel Foundry',
        iconPos: { x: 6, y: 0 },
        levels: ['-', '150K', '900K', '600B', '150t', '2.5q'],
    },
    {
        id: 15,
        name: 'Plastic Produced',
        iconPos: { x: 9, y: 0 },
        levels: ['-', '1t'],
    },
    {
        id: 16,
        name: 'Plastic Maker',
        iconPos: { x: 9, y: 0 },
        levels: ['-', '12M', '5B', '600B'],
    },
    {
        id: 17,
        name: 'Electronics Produced',
        iconPos: { x: 2, y: 1 },
        levels: ['-', '1500B'],
    },
    {
        id: 18,
        name: 'Electronics Maker',
        iconPos: { x: 2, y: 1 },
        levels: ['-', '400M', '3B'],
    },
    {
        id: 19,
        name: 'Bullet Maker',
        iconPos: { x: 8, y: 1 },
        levels: ['-', '220B', '600B', '350t'],
    },
    {
        id: 20,
        name: 'Gun Maker',
        iconPos: { x: 9, y: 1 },
        levels: ['-', '450B', '2500B', '900t'],
    },
    {
        id: 21,
        name: 'Engine Maker',
        iconPos: { x: 5, y: 1 },
        levels: ['-', '1300B', '4q'],
    },
    {
        id: 22,
        name: 'Tank Hull Maker',
        iconPos: { x: 1, y: 2 },
        levels: ['-', '600B', '1500B'],
    },
    {
        id: 23,
        name: 'Tank Turret Maker',
        iconPos: { x: 2, y: 2 },
        levels: ['-', '450B', '1t'],
    },
    {
        id: 24,
        name: 'Tank Assembler',
        iconPos: { x: 3, y: 2 },
        levels: ['-', '300B', '2t'],
    },
    {
        id: 25,
        name: 'Diesel Refinery',
        iconPos: { x: 5, y: 2 },
        levels: ['-', '900B'],
    },
    {
        id: 26,
        name: 'Jet Fuel Refinery',
        iconPos: { x: 1, y: 3 },
        levels: ['-', '700B'],
    },
    {
        id: 27,
        name: 'Rocket Hull Maker',
        iconPos: { x: 6, y: 2 },
        levels: ['-', '1500B'],
    },
    {
        id: 28,
        name: 'Warhead Maker',
        iconPos: { x: 7, y: 2 },
        levels: ['-', '2t'],
    },
    {
        id: 29,
        name: 'Rocket Assembler',
        iconPos: { x: 8, y: 2 },
        levels: ['-', '2500B'],
    },
]

const sellers = [
    {
        id: 30,
        name: 'Iron Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '500', '2K'],
    },
    {
        id: 31,
        name: 'Steel Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '50K', '300K'],
    },
    {
        id: 32,
        name: 'Plastic Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '12M', '9500M'],
    },
    {
        id: 33,
        name: 'Electronics Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '200M', '2B'],
    },
    {
        id: 34,
        name: 'Gun Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '120B'],
    },
    {
        id: 35,
        name: 'Engine Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '800B'],
    },
    {
        id: 36,
        name: 'Tank Seller',
        iconPos: { x: 4, y: 0 },
        levels: ['-', '400B', '6200B'],
    },
]
