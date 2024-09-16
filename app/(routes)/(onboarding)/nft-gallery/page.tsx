import { NextPage } from 'next';
import Image from 'next/image';

interface Props {}

const BasicReadingPage: NextPage<Props> = ({}) => {
    return (
        <div className="flex flex-col items-center gap-50px pt-120px">
            <h1 className="text-32px">
                Coming Soon
            </h1>
            <Image src="/sun-vector.png" alt="" width={260} height={260} />
        </div>
    );
};

export default BasicReadingPage;
