import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlueDot, GreenDot, RedDot } from '../../../public/assets/svgs';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { EventFace } from '../../types';
import { api } from '../../utils/api';
import { getDateFromTimestamp, getHourAndMinutesFromTimestamp } from '../../utils/utils';
import { toast } from '../../utils/toast';

const IndexOperator = () => {
    const [baseData, setBaseData] = useState<EventFace[]>([]);
    const [stat, setStat] = useState<{ total: number; good: number; bad: number }>({ total: 0, good: 0, bad: 0 });
    const [loading, setLoading] = useState(false);
    const {    accsessToken} = useSelector((state: IRootState) => state.data);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Asosiy sahifa'));
        api('basedata/last-updated', { headers: { authorization: `Bearer ${accsessToken}` } })
            .then(res => {
                const { data } = res;
                const bad = data.filter((el: EventFace) => el.signal === 'nosignal');
                const good = data.filter((el: EventFace) => el.signal === 'good');
                setStat({ total: data.length, good: good.length, bad: bad.length });
                setBaseData(data);
            })
            .catch(err => {
                toast.fire({
                    text: err.response.data.msg || 'Xatolik ',
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    timerProgressBar: true
                });
            });
    }, []);
    return (
        <div>
            <div className='flex flex-wrap w-full justify-evenly mb-5'>
                <div className='border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative'>
                    <h5 className='text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light'>
                        <BlueDot /> Barchasi: {stat?.total}
                    </h5>
                </div>
                <div className='border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative'>
                    <h5 className='text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light'>
                        <GreenDot /> Yaxshi: {stat?.good}
                    </h5>
                </div>
                <div className='border border-gray-500/20 rounded-md w-1/4 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] md:p-6 p-1 relative'>
                    <h5 className='text-dark md:text-lg text-sm font-semibold  flex items-center gap-4 dark:text-white-light'>
                        <RedDot /> Signal yoq: {stat?.bad}
                    </h5>
                </div>
            </div>
            <div className='overflow-x-scroll  md:overflow-x-auto'>
                <table>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Obyekt nomi</th>
                            <th className='text-center'>Seriya</th>
                            <th className='text-center'>Suv satxi(sm)</th>
                            <th className='text-center'>Hajm</th>
                            <th className='text-center'>Bosim (kPa)</th>
                            <th className='text-center'>Vaqt</th>
                            <th className='text-center'>Sana</th>
                            <th className='text-center'>Signal holati</th>
                        </tr>
                    </thead>
                    <tbody>
                        {baseData?.map((data, i) => {
                            return (
                                <tr key={data._id}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className='whitespace-nowrap'>{data?.device?.name}</div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap'>{data?.device?.serie}</div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap'>{data?.level}</div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap'>{data?.volume}</div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap'>{data?.pressure || 961.8}</div>
                                    </td>

                                    <td>
                                        <div className='whitespace-nowrap  '>{getHourAndMinutesFromTimestamp(data?.date_in_ms || 0)}</div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap  '>{getDateFromTimestamp(data?.date_in_ms || 0)}</div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap    flex items-center gap-2'>
                                            {' '}
                                            {data.signal === 'good' ? <GreenDot /> : <RedDot />} {data?.signal === 'good' ? 'Yaxshi' : "Signal yo'q"}{' '}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IndexOperator;
