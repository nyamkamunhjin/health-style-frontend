/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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

const URL_IMAGE_PREFIX = 'https://file.htstyle.ml/licemed-images/';

const Drug: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const drug = useRequest(DrugsAPI.getDrugDetail);

  useEffect(() => {
    if (id) void drug.run(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {drug.data && (
        <Head>
          <title>{drug.data.name}</title>
          <meta name="title" content={drug.data.name} />
          <meta
            name="image"
            content={drug.data?.licemed_item_dtl?.images[0]?.path || ''}
          />
          <meta name="description" content={drug.data?.inter_name} />
          <meta name="author" content={drug.data.supplier} />
          <meta name="og:title" content={drug.data.name} />
          <meta
            name="og:image"
            content={drug.data?.licemed_item_dtl?.images[0]?.path || ''}
          />
          <meta name="og:description" content={drug.data?.inter_name} />
          <meta name="og:author" content={drug.data.supplier} />
        </Head>
      )}
      <div
        className="bg-fixed bg-cover"
        style={{
          background: `url('/background.png')`,
        }}
      >
        <div className="glass mx-auto max-w-4xl w-full pt-10 flex flex-col gap-4 p-4">
          <button
            className="btn w-24"
            type="button"
            onClick={() => router.push('/')}
          >
            Буцах
          </button>
          <div className="flex-col md:flex-wrap gap-2">
            {drug.data?.licemed_item_dtl?.images[0]?.path && (
              <Zoom>
                <img
                  className="w-72 rounded-xl object-contain border border-solid border-black"
                  src={`${URL_IMAGE_PREFIX}${drug.data?.licemed_item_dtl?.images[0].path}`}
                  alt="Эмний зураг"
                />
              </Zoom>
            )}
            <div>
              <p className="text-4xl font-semibold">{drug.data?.name}</p>
              <div className="flex flex-col">
                <span className="text-gray-600">
                  Тун: <span className="text-black">{drug.data?.med_dose}</span>
                </span>
                <span className="text-gray-600">
                  Барааны дугаар:{' '}
                  <span className="text-black">
                    {drug.data?.product_number}
                  </span>
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
                  Баркод:{' '}
                  <span className="text-black">{drug.data?.barcode}</span>
                </span>
              </div>
            </div>
          </div>
          {/* <p className="text-4xl font-semibold">Зурагнууд</p>
          <div className="w-full flex flex-wrap gap-2 items-start">

                <Zoom>
                  <img
                    className="w-72 rounded-xl object-contain border border-solid border-black"
                    src={`${URL_IMAGE_PREFIX}/${drug.data?.licemed_item_dtl?.images[0].path}`}
                    alt="Эмний зураг"
                  />
                </Zoom>

          </div> */}
          {drug.data?.licemed_item_dtl?.content !== '<span></span>' && (
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-semibold">Хэрэглэх заавар</p>
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
export default Drug;
