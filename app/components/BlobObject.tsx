import React, { useState, useRef, useEffect, ObjectHTMLAttributes } from 'react';
import { Skeleton } from '@radix-ui/themes';

export const BlobObject: React.FC<ObjectHTMLAttributes<HTMLObjectElement>> = ({ data, type="image/jpeg", onLoad, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const objectRef = useRef<HTMLObjectElement>(null);

    useEffect(() => {
        const objectElement = objectRef.current;
        if (objectElement) {
            objectElement.onload = (event: any) => {
                setIsLoading(false);
                onLoad?.(event);
            };
            objectElement.onerror = () => {
                setIsLoading(false);
            };
        }
    }, [onLoad]);

    return (
        <>
            <Skeleton loading={isLoading}>
                <object ref={objectRef} data={data} type={type} {...props} />
            </Skeleton>
        </>
    );
};
