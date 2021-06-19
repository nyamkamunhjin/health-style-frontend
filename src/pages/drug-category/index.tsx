/* eslint-disable react/no-unescaped-entities */
import { useRequest } from 'ahooks';
import { List, Select } from 'antd';
import DrugCategories from 'api/DrugCategories';
import DrugsAPI, { Drug } from 'api/DrugsAPI';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const DrugCategory: NextPage = () => {
  const [selectInput, setSelectedInput] = useState<string>();
  const [input, setInput] = useState('');
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<Drug[]>([]);

  const drugs = useRequest(DrugsAPI.searchDrugCategories, {
    debounceInterval: 500,
    manual: true,
    onSuccess: (res) => {
      setFilteredData(res);
    },
  });

  useEffect(() => {
    if (!selectInput || selectInput?.trim() === '') {
      drugs.mutate(undefined);
    } else {
      void drugs.run(selectInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectInput]);

  useEffect(() => {
    if (drugs.data) {
      setFilteredData(drugs.data.filter((each) => each.name.includes(input)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <>
      <Head>
        <title>Ангилалаар хайх</title>
      </Head>
      <div
        className="w-screen h-screen flex flex-col lg:flex-row gap-2 bg-cover"
        style={{ background: `url('background.png')` }}
      >
        <div className="w-full h-full lg:w-1/2 flex flex-col items-center p-4 gap-4 pt-10 glass">
          <div className="glass flex flex-col gap-4 w-full max-w-md p-4">
            <div className="flex flex-col gap-4 items-center">
              <span className="text-xl">Ангилал сонгох</span>
              <Select
                className="w-full"
                value={selectInput}
                onChange={(e) => setSelectedInput(e)}
                allowClear
              >
                {DrugCategories.map((each) => (
                  <Select.Option key={each.id} value={each.code}>
                    <p className="flex gap-2 items-center">
                      {each.icon}
                      <span className="truncate">{each.name}</span>
                    </p>
                  </Select.Option>
                ))}
              </Select>

              {selectInput && selectInput.trim() !== '' && (
                <div className="flex flex-col gap-2 items-center w-full">
                  <span className="text-xl">Хайх</span>
                  <input
                    className="input w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Ибупрофен гэх мэт... "
                  />
                </div>
              )}
            </div>
          </div>

          <span className="text-xl">Эмийн жагсаалт</span>
          {Array.isArray(filteredData) && filteredData.length > 0 && (
            <p className="w-full text-right">{filteredData.length} эм олдлоо</p>
          )}
          <List
            className="w-full overflow-y-scroll"
            size="large"
            dataSource={filteredData}
            loading={drugs.loading}
            renderItem={(item) => (
              <List.Item
                className="p-4 bg-white rounded-xl mx-2 mb-2 border-none hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/drug/${item.id}`)}
              >
                <Link href={`/drug/${item.id}`}>
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
                </Link>
              </List.Item>
            )}
          />
        </div>
        <div className="w-full hidden lg:visible lg:w-1/2 gap-4 p-4" />
      </div>
    </>
  );
};

export default DrugCategory;
