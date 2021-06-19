/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-unescaped-entities */
import DrugsAPI, { Drug } from 'api/DrugsAPI';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const URL_IMAGE_PREFIX = 'https://file.htstyle.ml/licemed-images/';

interface Props {
  drug: Drug;
}

const DrugRender: NextPage<Props> = ({ drug }) => {
  const router = useRouter();

  return (
    <>
      {drug && (
        <Head>
          <title>{drug.name}</title>
          <meta name="title" content={drug.name} />
          <meta
            name="image"
            content={drug?.licemed_item_dtl?.images[0]?.path || ''}
          />
          <meta name="description" content={drug?.inter_name} />
          <meta name="author" content={drug.supplier} />
          <meta name="og:title" content={drug.name} />
          <meta
            name="og:image"
            content={drug?.licemed_item_dtl?.images[0]?.path || ''}
          />
          <meta name="og:description" content={drug?.inter_name} />
          <meta name="og:author" content={drug.supplier} />
        </Head>
      )}
      <div
        className="bg-fixed bg-cover"
        style={{
          background: `url('/background.png')`,
        }}
      >
        <div className="glass mx-auto max-w-4xl w-full min-h-screen pt-10 flex flex-col gap-4 p-4">
          <button
            className="btn w-24"
            type="button"
            onClick={() => router.push('/')}
          >
            Буцах
          </button>
          <div className="flex-col md:flex-wrap gap-2">
            {drug?.licemed_item_dtl?.images[0]?.path && (
              <Zoom>
                <img
                  className="w-72 rounded-xl object-contain border border-solid border-black"
                  src={`${URL_IMAGE_PREFIX}${drug?.licemed_item_dtl?.images[0].path}`}
                  alt="Эмний зураг"
                />
              </Zoom>
            )}
            <div>
              <p className="text-4xl font-semibold">{drug?.name}</p>
              <div className="flex flex-col">
                <span className="text-gray-600">
                  Тун: <span className="text-black">{drug?.med_dose}</span>
                </span>
                <span className="text-gray-600">
                  Барааны дугаар:{' '}
                  <span className="text-black">{drug?.product_number}</span>
                </span>
                <span className="text-gray-600">
                  Нэршил: <span className="text-black">{drug?.inter_name}</span>
                </span>
                <span className="text-gray-600">
                  Тодорхойлолт:{' '}
                  <span className="text-black">{drug?.specification}</span>
                </span>
                <span className="text-gray-600">
                  Тун: <span className="text-black">{drug?.med_dose}</span>
                </span>
                <span className="text-gray-600">
                  Савалгаа:{' '}
                  <span className="text-black">{drug?.packaging}</span>
                </span>
                <span className="text-gray-600">
                  Улс: <span className="text-black">{drug?.country}</span>
                </span>
                <span className="text-gray-600">
                  Нийлүүлэгч:{' '}
                  <span className="text-black">{drug?.supplier}</span>
                </span>
                <span className="text-gray-600">
                  Баркод: <span className="text-black">{drug?.barcode}</span>
                </span>
              </div>
            </div>
          </div>
          {/* <p className="text-4xl font-semibold">Зурагнууд</p>
          <div className="w-full flex flex-wrap gap-2 items-start">

                <Zoom>
                  <img
                    className="w-72 rounded-xl object-contain border border-solid border-black"
                    src={`${URL_IMAGE_PREFIX}/${drug?.licemed_item_dtl?.images[0].path}`}
                    alt="Эмний зураг"
                  />
                </Zoom>

          </div> */}
          {drug?.licemed_item_dtl?.content !== '<span></span>' && (
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-semibold">Хэрэглэх заавар</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: drug?.licemed_item_dtl?.content || '',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default DrugRender;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let data;
  if (params)
    data = await DrugsAPI.getDrugDetail(params.id as string).catch((err) => {
      console.error(err);
    });
  else data = null;

  if (!data) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      drug: data,
    },
  };
};
