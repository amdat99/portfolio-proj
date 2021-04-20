import { useRef, useEffect } from 'react';

    const useWindowUnloadEffect = (handler, callOnCleanup) => {
        const cb = useRef()
        
        cb.current = handler
        
        useEffect(() => {
          const handler = () => cb.current()
        
          window.addEventListener('beforeunload', handler)
          
          return () => {
            if(callOnCleanup) handler()
          
            window.removeEventListener('beforeunload', handler)
          }
          //eslint-disable-next-line
        }, [cb,callOnCleanup])
      }

export default useWindowUnloadEffect;