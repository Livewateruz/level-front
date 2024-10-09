import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { AxiosResponse } from 'axios';
import { toast } from '../../utils/toast';
import { Delivered } from '../../types';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { getPrettyTime } from '../../utils/utils';

const Sms = () => {
    const [data, setData] = useState<{ data: { balance: number }; status: string }>();
    const [sended, setSended] = useState<any>({
        data: {
            result: []
        }
    });
    const [page, setPage] = useState<number>(0);
    const [delivered, setDelivered] = useState<any>();
    const [loading, setLoading] = useState<'refreshing' | 'uploading' | 'updating' | 'noaction'>('noaction');
    const token = useSelector((state: IRootState) => state.data.accsessToken);

    const [report, setReport] = useState<{ year?: string; month?: string }>({});
    useEffect(() => {
        api.get('sms/limit')
            .then((res: AxiosResponse) => {
                setData(res.data);
            })
            .catch((err: AxiosResponse) => {
                toast.fire({ icon: 'error', title: err?.statusText || 'SMS token' });
            });
    }, []);
    useEffect(() => {
        api.get(`sms/sended?page[limit]=20&page[offset]=${page}`)
            .then((res: AxiosResponse) => {
                console.log(res.data);
                setSended(res.data);
            })
            .catch((err: AxiosResponse) => {
                toast.fire({ icon: 'error', title: err?.statusText || 'SMS token' });
            });
    }, [page]);

    console.log(sended);
    const handleChange = (e: any) => {
        setReport(prevData => ({
            ...prevData!,
            [e.target.name]: e.target.value
        }));
    };
    const submit = (e: any) => {
        e.preventDefault();
        api.post('sms/total', report, { headers: { authorization: `Bearer ${token}` } })
            .then((response: AxiosResponse) => {
                setDelivered(response.data);
            })
            .catch(err => {
                toast.mixin({ icon: 'error', title: err?.statusText || "Birozdan so'ng urinib ko'ring" });
            });
    };
    const refresh = (e: any) => {
        setLoading('refreshing');
        api.get('sms/refresh', { headers: { authorization: `Bearer ${token}` } })
            .then((res: AxiosResponse) => {
                toast.fire({ icon: 'success', title: res?.data?.msg || 'SMS token' });
            })
            .catch((err: AxiosResponse) => {
                toast.fire({ icon: 'error', title: err?.statusText || 'SMS token' });
            })
            .finally(() => {
                setLoading('noaction');
            });
    };
    return (
        <div className='flex-1 min-h-full p-4'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <h1 className={`text-2xl ${data?.status !== 'success' ? 'text-red-500' : 'text-green-500'}`}>Status: {data?.status || "SMS tokenni yangilab ko'ring"}</h1>
                    <h1 className='text-5xl '>Balance:{data?.data?.balance || 0} so'm</h1>
                </div>

                <button title='SMS tokenni yangilash' onClick={refresh}>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={`w-6 h-6 ${loading === 'refreshing' && 'animate-spin'}`}>
                        <path
                            d='M12.0789 3V2.25V3ZM3.67981 11.3333H2.92981H3.67981ZM3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333L2.92981 13H4.42981L4.42981 11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z'
                            fill='currentColor'
                        ></path>
                        <path
                            opacity='0.5'
                            d='M11.8825 21V21.75V21ZM20.3137 12.6667H21.0637H20.3137ZM20.3137 11L20.8409 10.4666C20.5487 10.1778 20.0786 10.1778 19.7864 10.4666L20.3137 11ZM18.1002 12.1333C17.8056 12.4244 17.8028 12.8993 18.094 13.1939C18.3852 13.4885 18.86 13.4913 19.1546 13.2001L18.1002 12.1333ZM21.4727 13.2001C21.7673 13.4913 22.2421 13.4885 22.5333 13.1939C22.8245 12.8993 22.8217 12.4244 22.5271 12.1332L21.4727 13.2001ZM5.31769 16.6061C5.10016 16.2536 4.63806 16.1442 4.28557 16.3618C3.93307 16.5793 3.82366 17.0414 4.0412 17.3939L5.31769 16.6061ZM11.8825 21.75C16.9448 21.75 21.0637 17.6915 21.0637 12.6667H19.5637C19.5637 16.8466 16.133 20.25 11.8825 20.25V21.75ZM21.0637 12.6667V11H19.5637V12.6667H21.0637ZM19.7864 10.4666L18.1002 12.1333L19.1546 13.2001L20.8409 11.5334L19.7864 10.4666ZM19.7864 11.5334L21.4727 13.2001L22.5271 12.1332L20.8409 10.4666L19.7864 11.5334ZM4.0412 17.3939C5.65381 20.007 8.56379 21.75 11.8825 21.75V20.25C9.09999 20.25 6.6656 18.7903 5.31769 16.6061L4.0412 17.3939Z'
                            fill='currentColor'
                        ></path>
                    </svg>
                </button>
            </div>
            <form onSubmit={e => submit(e)} className='form flex gap-5  my-12'>
                <select required={true} onChange={e => handleChange(e)} name='year' id='year' className='form-select   text-white-dark w-56'>
                    <option selected disabled>
                        Yilni Tanlang
                    </option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                    <option value={2028}>2028</option>
                    <option value={2029}>2029</option>
                    <option value={2030}>2030</option>
                    <option value={2031}>2031</option>
                </select>
                <select required={true} onChange={e => handleChange(e)} name='month' id='month' className='form-select   text-white-dark w-56'>
                    <option selected disabled>
                        Oyni Tanlang
                    </option>
                    <option value={1}>Yanvar</option>
                    <option value={2}>Fevral</option>
                    <option value={3}>Mart</option>
                    <option value={4}>Aprel</option>
                    <option value={5}>May</option>
                    <option value={6}>Iyun</option>
                    <option value={7}>Iyul</option>
                    <option value={8}>August</option>
                    <option value={9}>Sentyabr</option>
                    <option value={10}>Oktyabr</option>
                    <option value={11}>Noyabr</option>
                    <option value={12}>Dekabr</option>
                </select>
                <button className='btn btn-primary' type='submit'>
                    Hisobotni qabul qilish
                </button>
            </form>
            <div className='flex flex-col'>
                <h1 className={`text-md my-4 ${delivered?.status !== 'success' ? 'text-yellow-600' : 'text-green-500'}`}>Status: {delivered?.status || 'Yuboring'}</h1>
                {delivered && (
                    <table>
                        <thead>
                            <tr>
                                {' '}
                                <th className='text-center text-xs'>#</th>
                                <th className='text-center text-xs'>Oy</th>
                                <th className='text-center text-xs'>Umumiy</th>
                                <th className='text-center text-xs'>Yuborilgan</th>
                                <th className='text-center text-xs'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {delivered?.data.map((data: Delivered, key: number) => {
                                return (
                                    <tr key={key} className=''>
                                        <td className=''>
                                            <div className='whitespace-nowrap text-xs'>{1 + key}</div>
                                        </td>
                                        <td>
                                            <div className='whitespace-nowrap text-xs'>{data.month}</div>
                                        </td>
                                        <td>
                                            <div className='whitespace-nowrap text-xs'>{data.packets}</div>
                                        </td>
                                        <td>
                                            <div className='whitespace-nowrap text-xs'>{data.sent_packets}</div>
                                        </td>
                                        <td>
                                            <div className='whitespace-nowrap text-xs'>{delivered.status}</div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <table className='mt-8'>
                    <thead>
                        <tr>
                            <th className='w-fit text-xs whitespace-nowrap'>#</th>
                            <th className='text-center text-xs whitespace-nowrap'>Message</th>
                            <th className='text-center text-xs whitespace-nowrap'>To</th>
                            <th className='text-center text-xs whitespace-nowrap'>Price (UZS)</th>
                            <th className='text-center text-xs whitespace-nowrap'>Sended</th>
                            <th className='text-center text-xs whitespace-nowrap'>Delivered</th>
                            <th className='text-center text-xs whitespace-nowrap'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sended?.data?.result.map((data: any, key: number) => {
                            return (
                                <tr key={key} className=''>
                                    <td className='w-fit'>
                                        <div className='text-xs'>{20 * page + (key + 1)} </div>
                                    </td>
                                    <td>
                                        <div title={data?.message} className='whitespace-nowrap text-xs'>
                                            {data?.message.slice(0, 60)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap text-xs'>{data?.to}</div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap text-xs'>
                                            {data?.price}/{data?.total_price}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap text-xs'>{getPrettyTime(data?.created_at)} </div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap text-xs'>{getPrettyTime(data?.delivery_sm_at)} </div>
                                    </td>
                                    <td>
                                        <div className='whitespace-nowrap text-xs'>{data?.status}</div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <ul className='flex items-center justify-center space-x-1 rtl:space-x-reverse  mt-8 mx-auto'>
                        <li>
                            <button
                                disabled={page === 0}
                                onClick={() => setPage(page - 1)}
                                type='button'
                                className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                            >
                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 rtl:rotate-180'>
                                    <path d='M15 5L9 12L15 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                type='button'
                                className={`flex justify-center items-center w-10 h-10 font-semibold p-2 rounded-full transition  text-dark hover:text-white hover:bg-primary dark:text-white-light  dark:hover:bg-primary dark:bg-primary`}
                            >
                                {page + 1}
                            </button>
                        </li>

                        <li>
                            <button
                                disabled={sended?.data?.total / 20 <= page + 1}
                                onClick={() => setPage(page + 1)}
                                type='button'
                                className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                            >
                                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='rtl:rotate-180'>
                                    <path d='M9 5L15 12L9 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </table>
            </div>
        </div>
    );
};

export default Sms;
