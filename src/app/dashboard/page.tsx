import { FC } from 'react';
import Button from '../components/ui/Button';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return <div>
        Dashboard
        <Button>
            Helllooo
        </Button>
    </div>;
};

export default page;
