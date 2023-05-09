import React from 'react'
import componentIcons from '../componentIcons.png'

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
