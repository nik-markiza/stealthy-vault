import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';


const useIsOnline = () => {
    const [isOnline, setOnline] = useState<boolean | null>(null);

    useEffect(() => {
			NetInfo.fetch().then(state => {
				setOnline(prev => (prev !== state.isConnected ? state.isConnected ?? false : prev));
			})

      const unsubscribe = NetInfo.addEventListener(state => {
		setOnline(!!state.isConnected);
			})

			return () => unsubscribe();
    }, []);

    return { isOnline };
}

export default useIsOnline;
