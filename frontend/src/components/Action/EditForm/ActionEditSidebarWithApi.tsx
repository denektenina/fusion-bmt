import React from 'react'
import { Action, Participant, Question } from '../../../api/models'
import ActionEditSidebar from './ActionEditSidebar'
import { useCreateNoteMutation, useEditActionMutation } from '../../../api/mutations'
import { TextArea } from '@equinor/fusion-components'

interface Props {
    action: Action
    isOpen: boolean
    onClose: () => void
    connectedQuestion: Question
    possibleAssignees: Participant[]
}

const ActionEditSidebarWithApi = ({ action, isOpen, onClose, connectedQuestion, possibleAssignees }: Props) => {
    const { editAction, loading: isActionSaving, error: errorEditingAction } = useEditActionMutation()
    const { createNote, loading: isNoteSaving, error: errorCreatingNote } = useCreateNoteMutation()

    if (errorEditingAction !== undefined) {
        return (
            <div>
                <TextArea value={`Error editing action: ${JSON.stringify(errorEditingAction)}`} onChange={() => {}} />
            </div>
        )
    }

    if (errorCreatingNote !== undefined) {
        return (
            <div>
                <TextArea value={`Error creating note: ${JSON.stringify(errorCreatingNote)}`} onChange={() => {}} />
            </div>
        )
    }

    return (
        <ActionEditSidebar
            action={action}
            open={isOpen}
            onClose={onClose}
            connectedQuestion={connectedQuestion}
            possibleAssignees={possibleAssignees}
            isActionSaving={isActionSaving}
            isNoteSaving={isNoteSaving}
            onActionEdit={action => {
                editAction(action)
            }}
            onNoteCreate={(actionId: string, text: string) => {
                createNote(actionId, text)
            }}
        />
    )
}

export default ActionEditSidebarWithApi
