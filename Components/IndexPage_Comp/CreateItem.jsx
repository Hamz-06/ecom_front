import React from 'react'
import { useMemo, memo } from 'react'

export function memos() {
    return (
        <div className='flex items-center justify-center w-full h-full'>

      
        </div>
    )
}

const CreateItem = memo(memos)
export { CreateItem }