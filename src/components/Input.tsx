import React from 'react'

interface InputProps {
    label?: string
    before?: string
    after?: string

    value?: string
    onChange?: (_: { value: string; event: React.ChangeEvent<HTMLInputElement> }) => void

    disabled?: boolean
}

export const Input: React.FC<InputProps> = ({
    label,
    before,
    after,
    value = '',
    onChange = () => {},
    disabled = false,
}) => (
    <div className='flex items-center'>
        {label && <span className='mr-2'>{label}</span>}
        {before && before}
        <input
            type='text'
            value={value}
            onChange={ev => onChange({ value: ev.target.value, event: ev })}
            className='rounded border-gray-400 p-0 px-2'
            disabled={disabled}
        />
        {after && after}
    </div>
)
