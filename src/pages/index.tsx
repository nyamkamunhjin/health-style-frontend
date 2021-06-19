/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-self-import */
/* eslint-disable react/no-unescaped-entities */
import { useRequest } from 'ahooks';
import { List } from 'antd';
import DrugsAPI, { Drug } from 'api/DrugsAPI';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const drugs = useRequest(DrugsAPI.searchDrugs, {
    debounceInterval: 500,
    manual: true,
  });

  useEffect(() => {
    if (input.trim() === '') {
      drugs.mutate(undefined);
    } else {
      void drugs.run(input);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <>
      <Head>
        <title>HealthStyle</title>
      </Head>
      <div
        className="w-screen h-screen flex flex-col lg:flex-row gap-2 bg-fixed"
        style={{ background: `url('/background.png')` }}
      >
        <div className="w-full h-full lg:w-1/2 flex flex-col items-center p-4 gap-4 pt-10 glass">
          <div className="glass flex flex-col gap-4 w-full max-w-md p-4">
            <div className="flex flex-col gap-4 items-center">
              <button
                className="btn ml-auto"
                type="button"
                onClick={() => router.push('/drug-category')}
              >
                Ангилалаар хайх
              </button>
              <span className="text-xl">Хайх утга</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="input w-full"
                type="text"
                placeholder="Ибупрофен гэх мэт... "
              />
            </div>
          </div>

          <span className="text-xl">Эмийн жагсаалт</span>
          {Array.isArray(drugs.data) && drugs.data.length > 0 && (
            <p className="w-full text-right">{drugs.data.length} эм олдлоо</p>
          )}
          <List
            className="w-full overflow-y-scroll"
            size="large"
            dataSource={drugs.data as Drug[]}
            loading={drugs.loading}
            renderItem={(item) => (
              <List.Item
                className="p-4 bg-white rounded-xl mx-2 mb-2 border-none hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/drug/${item.id}`)}
              >
                <div className="flex flex-col">
                  <span className="text-gray-600">
                    Нэр: <span className="text-black">{item.name}</span>
                  </span>
                  <span className="text-gray-600">
                    Улс: <span className="text-black">{item.country}</span>
                  </span>
                  <span className="text-gray-600">
                    Нийлүүлэгч:{' '}
                    <span className="text-black">{item.supplier}</span>
                  </span>
                  <span className="text-gray-600">
                    Баркод: <span className="text-black">{item.barcode}</span>
                  </span>
                  <span className="text-gray-600">
                    Тун: <span className="text-black">{item.med_dose}</span>
                  </span>
                  <span className="text-gray-600">
                    Савалгаа:{' '}
                    <span className="text-black">{item.packaging}</span>
                  </span>
                </div>
              </List.Item>
            )}
          />
        </div>
        <div className="w-full hidden lg:visible lg:w-1/2 gap-4 p-4" />
      </div>
    </>
  );
};

export default Home;
