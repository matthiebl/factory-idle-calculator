import React from 'react'

export * from './Input'
export * from './Upgrade'
export * from './UpgradeSelection'

export const useLocalStorage = (key: string, defaultValue: Object) => {
    const [value, setValue] = React.useState(() => {
        try {
            const saved = localStorage.getItem(key)
            if (saved !== null) {
                return JSON.parse(saved)
            }
            return defaultValue
        } catch {
            return defaultValue
        }
    })

    React.useEffect(() => {
        const rawValue = JSON.stringify(value)
        localStorage.setItem(key, rawValue)
    }, [value])

    React.useEffect(() => {
        const saved = localStorage.getItem(key)
        if (saved !== null) {
            setValue(JSON.parse(saved))
        } else {
            setValue(defaultValue)
        }
    }, [key])

    return [value, setValue]
}

export type UpgradeT = {
    id: number
    name: string
    iconPos: { x: number; y: number }
    levels: string[]
}

export const utility: Record<number, UpgradeT> = {
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

export const buyers: Record<number, UpgradeT> = {
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

export const makers: Record<number, UpgradeT> = {
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

export const sellers: Record<number, UpgradeT> = {
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
