/* eslint-disable react/no-danger */
/* eslint-disable react/no-unescaped-entities */
import { useRequest } from 'ahooks';
import DrugsAPI from 'api/DrugsAPI';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const URL_IMAGE_PREFIX = 'http://103.50.204.55:9001/licemed-images/';
const backgroundImage =
  'https://c.pxhere.com/photos/65/f4/headache_pain_pills_medication_tablets_drugs_drugstore_medicine-565804.jpg!d';
const Card: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const drug = useRequest(DrugsAPI.getDrugDetail);

  useEffect(() => {
    if (id) void drug.run(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Head>
        <title>WTF</title>
      </Head>
      <div
        className="w-screen h-screen bg-cover bg-scroll"
        style={{ background: `url(${backgroundImage})` }}
      >
        <div className="glass mx-auto max-w-4xl w-full pt-20 flex flex-col gap-4 p-4">
          <button
            className="btn w-24"
            type="button"
            onClick={() => router.push('/')}
          >
            Буцах
          </button>
          <p className="text-4xl font-semibold">{drug.data?.name}</p>
          <div className="flex flex-col">
            <span className="text-gray-600">
              Тун: <span className="text-black">{drug.data?.med_dose}</span>
            </span>
            <span className="text-gray-600">
              Барааны дугаар:{' '}
              <span className="text-black">{drug.data?.product_number}</span>
            </span>
            <span className="text-gray-600">
              Нэршил:{' '}
              <span className="text-black">{drug.data?.inter_name}</span>
            </span>
            <span className="text-gray-600">
              Тодорхойлолт:{' '}
              <span className="text-black">{drug.data?.specification}</span>
            </span>
            <span className="text-gray-600">
              Тун: <span className="text-black">{drug.data?.med_dose}</span>
            </span>
            <span className="text-gray-600">
              Савалгаа:{' '}
              <span className="text-black">{drug.data?.packaging}</span>
            </span>
            <span className="text-gray-600">
              Улс: <span className="text-black">{drug.data?.country}</span>
            </span>
            <span className="text-gray-600">
              Нийлүүлэгч:{' '}
              <span className="text-black">{drug.data?.supplier}</span>
            </span>
            <span className="text-gray-600">
              Баркод: <span className="text-black">{drug.data?.barcode}</span>
            </span>
          </div>
          <div className="w-full flex flex-wrap justify-center gap-2 items-start">
            {drug.data?.licemed_item_dtl?.images.map(
              (each: { path: string }) => (
                <Zoom>
                  <img
                    className="w-72 object-contain border border-solid border-black"
                    src={`${URL_IMAGE_PREFIX}/${each.path}`}
                    alt="Эмний зураг"
                  />
                </Zoom>
              ),
            )}
          </div>
          {drug.data?.licemed_item_dtl?.content !== '<span></span>' && (
            <div>
              <p className="">Хэрэглэх заавар</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: drug.data?.licemed_item_dtl?.content || '',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Card;
