import * as React from 'react'
import { Tag } from '../../types/Database'
import { Button } from '../atoms/Button'

interface Props {
    categoryName?: string
    addTag?: (tag: Tag) => void
    tags: Tag[]
    isEditable?: boolean
    isRemovable?: boolean
    onRemove?: (tag: Tag) => void
}

export class TagList extends React.Component<Props> {
    public render() {
        const { categoryName, tags, isEditable, isRemovable, onRemove } = this.props

        return (
            <div className='TagList'>
                {categoryName && (
                    <h4>
                        {categoryName}
                    </h4>
                )}
                <ul>
                    {tags.map(tag => (
                        <li key={tag.id} data-tag-id={tag.id}>
                            <Button
                                type={`button`}
                                onClick={() => this.onAddTag(tag)}
                                key={tag.id}
                                data-tag-id={tag.id}
                                className='tagName'
                            >
                                {tag.name}
                                {isRemovable && onRemove && (
                                    <svg onClick={() => onRemove(tag)} xmlns='http://www.w3.org/2000/svg' className='remove' viewBox='0 0 512 512'>
                                        <path className='remove-1' d='M256 0a256 256 0 1 0 0 512 256 256 0 0 0 0-512zm0 480a224 224 0 1 1 0-448 224 224 0 0 1 0 448z'/>
                                        <path className='remove-1' d='M380 132a16 16 0 0 0-22 0L256 233 154 132a16 16 0 0 0-23 22h1l101 102-101 102a16 16 0 0 0 22 23v-1l102-101 102 101a16 16 0 0 0 22-22L279 256l101-102a16 16 0 0 0 0-22z'/>
                                    </svg>
                                )}
                                {isEditable && (
                                    <svg xmlns='http://www.w3.org/2000/svg' className='edit' viewBox='0 0 411.7 412'>
                                        <path d='M.45 399.05a10 10 0 0 0 12.49 12.5l60-18.59A110.15 110.15 0 0 0 118 365.71L220.84 262.9 235 248.78l21.84-21.84 119.53-119.56a30 30 0 0 1-.67 41.68L295.78 229a10 10 0 1 0 14.12 14.12l79.93-79.93a49.94 49.94 0 0 0-.2-70.81l-7.76-7.67L403 63.62a30 30 0 0 0 .15-42.23L390.8 8.92a30 30 0 0 0-42.66 0l-21 21.23-1.48-1.48a10 10 0 0 0-14.13 0L46.28 294A110.26 110.26 0 0 0 19 339.11zM388.83 49.49l-21.16 21.16-26.37-26.38L362.36 23a10 10 0 0 1 14.22 0l12.3 12.46a10 10 0 0 1-.05 14.03zM256.15 199.35l-43.5-43.5 106-106 43.5 43.5zm-35.31 35.31l-43.5-43.5L198.52 170l43.5 43.5zM103.9 351.59c-1 1-2.11 2.05-3.19 3l-43.34-43.3q1.49-1.64 3-3.2l102.84-102.81 43.51 43.5zm-78.76 35.27l13-41.84a89.42 89.42 0 0 1 7.45-17.3l38.71 38.72a89.12 89.12 0 0 1-17.3 7.44z' fill='#1c2c38'/>
                                    </svg>
                                )}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    private onAddTag = (tag: Tag) => {
        const { addTag } = this.props

        if (addTag) {
            addTag(tag)
        }
    }
}