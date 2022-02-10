import { useEffect, useCallback, useRef, useState } from 'react'

export const useFileDrop = (onFiles) => {
    const element = useRef(null)
    const prevListeners = useRef(null)
    const [dragging, setDragging]=useState(false)
    
    const preventExternalOpen = useCallback((event) => {
        event.preventDefault();
    }, [])
    const onDragOver = useCallback((event) => {
        event.preventDefault();
    }, [])
    const onDragEnter = useCallback((event) => {
        event.preventDefault();
        setDragging(true)
    }, [])
    const onDrag = useCallback((event) => {
        event.preventDefault();
        setDragging(true)
    }, [])
    const onDragLeave = useCallback((event) => {
        event.preventDefault();
        setDragging(false)
    }, [])
    const onDrop = useCallback((event) => {
        try {
            event.preventDefault();
            const files = []
            /** @type {DataTransferItemList} */
            const items = event.dataTransfer.items
            if (items) { 
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind === 'file') {
                        const file = items[i].getAsFile();
                        files.push(file)
                    }
                }
            } else {
                files.push(...event.dataTransfer.files);
            }
            if(typeof onFiles ==='function') {
                onFiles(files)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setDragging(false)
        }
    }, [])

    const cleanup = useCallback(() => {
        if (prevListeners.current) {
            window.removeEventListener("drop", preventExternalOpen)
            window.removeEventListener("dragover", preventExternalOpen)
            element.current.removeEventListener("drag", prevListeners.current.onDrag);
            element.current.removeEventListener("dragover", prevListeners.current.onDragOver);
            element.current.removeEventListener("dragenter", prevListeners.current.onDragEnter);
            element.current.removeEventListener("drop", prevListeners.current.onDrop);
            element.current.removeEventListener("dragleave", prevListeners.current.onDragLeave);
        }
    }, [])

    const attachListners = useCallback(() => {
        cleanup()
        if (element.current) {
            window.addEventListener("drop", preventExternalOpen)
            window.addEventListener("dragover", preventExternalOpen)
            element.current.addEventListener("drag", onDrag)
            element.current.addEventListener("dragover", onDragOver);
            element.current.addEventListener("dragenter", onDragEnter);
            element.current.addEventListener("drop", onDrop);
            element.current.addEventListener("dragleave", onDragLeave);
        }
        prevListeners.current = { onDragOver, onDrop, onDragEnter, onDragLeave }
    }, [onDragOver, onDragEnter, onDragLeave, onDrop, cleanup])
    useEffect(() => {
        attachListners()
        return cleanup
    }, [element])
    return (
        { element, dragging }
    )
}
