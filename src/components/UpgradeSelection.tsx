import React from 'react'
import { utility, buyers, makers, sellers, Upgrade } from '.'

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
