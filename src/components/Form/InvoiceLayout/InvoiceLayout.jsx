import React, { useRef, useState, useEffect, Suspense } from "react";
import './InvoiceLayout.css';
import './CanvasComponent.jsx';
import CanvasComponent from "./CanvasComponent.jsx";
import http from "../../../restapi/httpService";
import Loader from "../../atoms/Loading/TherapistLoader";
import { useLocation } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { displayState } from "../../../store/displayState";

// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import { useRecoilState, useRecoilValue } from "recoil";
// import { Table } from "../organisms/Table";


export const InvoiceLayout = () => {
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [memberText, setMemberText] = useState(null);

  const [displayStateValue, setDisplayState] = useRecoilState(displayState);
  const location = useLocation();
  ///////////////////間宮作業中///////////////////
  let pagePath = 'invoiceLayout';
  // let pageName = location.state?.data.name;
  let pageTitle = '会員様請求書';
  useEffect(() => {
      window.history.pushState(null, '', window.location.href);
      setDisplayState((prevState) => ({
          ...prevState,
          pageTitle: pageTitle,
          pagePath: pagePath,
      }))
  }, [location]);
  
  switch (displayStateValue.pagePath) {
    case 'invoiceLayout':
        document.title = '会員様請求書';
        document.body.style.backgroundColor = 'unset';

    break;
    default:
        //any
    break;
}
  console.log("✋✋✋✋✋✋✋ページタイトル確認", displayStateValue.pageTitle,);
  console.log("💦💦💦💦💦💦ページパス確認", displayStateValue.pagePath,);
///////////////////////////////////////////////////
  useEffect(() => {
    getInvoiceData();
  }, [])

  async function getInvoiceData() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const invoiceId = params.get('invoice_id');

    try {
      setLoading(true);
      const response = await http.get(`/member-invoice/${invoiceId}`);
      console.log("✋✋response", response);
      // console.log("✋✋✋✋✋✋✋ページタイトル確認", displayStateValue.pageTitle,);
      if (response) {
        let invoiceRes = response.data.data;
        setMemberText(invoiceRes.member_name);
        invoiceRes.member_invoice_month_temp = invoiceRes.member_invoice_month;
        invoiceRes.member_invoice_month = `${String(invoiceRes.member_invoice_month).slice(0, 4)}年${parseInt(String(invoiceRes.member_invoice_month).slice(-2))}月期`;
        let itemsList = [];
        if (invoiceRes.member_invoice_total_price_30min != 0) {
          let item = {};
          item['name'] = 'リハビリテーション料金30分';
          item['unit_price'] = invoiceRes.member_invoice_visit_unit_price_30min;
          item['unit'] = '回';
          item['qty'] = invoiceRes.member_invoice_number_of_visits_30min;
          item['total_price'] = invoiceRes.member_invoice_total_price_30min;
          itemsList.push(item);
        }
        if (invoiceRes.member_invoice_total_price_60min != 0) {
          let item = {};
          item['name'] = 'リハビリテーション料金60分';
          item['unit_price'] = invoiceRes.member_invoice_visit_unit_price_60min;
          item['unit'] = '回';
          item['qty'] = invoiceRes.member_invoice_number_of_visits_60min;
          item['total_price'] = invoiceRes.member_invoice_total_price_60min;
          itemsList.push(item);
        }
        if (invoiceRes.member_invoice_total_price_90min != 0) {
          let item = {};
          item['name'] = 'リハビリテーション料金90分';
          item['unit_price'] = invoiceRes.member_invoice_visit_unit_price_90min;
          item['unit'] = '回';
          item['qty'] = invoiceRes.member_invoice_number_of_visits_90min;
          item['total_price'] = invoiceRes.member_invoice_total_price_90min;
          itemsList.push(item);
        }
        if (invoiceRes.member_invoice_total_travel_expenses != 0) {
          let item = {};
          item['name'] = '出張費';
          item['unit_price'] = invoiceRes.member_invoice_travel_expenses;
          item['unit'] = '回';
          item['qty'] = invoiceRes.member_invoice_number_of_travel_used;
          item['total_price'] = invoiceRes.member_invoice_total_travel_expenses;
          itemsList.push(item);
        }
        if (invoiceRes.member_invoice_advance_amount != 0) {
          let item = {};
          item['name'] = '立替金';
          item['unit_price'] = '-';
          item['unit'] = '式';
          item['qty'] = 1;
          item['total_price'] = invoiceRes.member_invoice_advance_amount;
          itemsList.push(item);
        }
        if (invoiceRes.member_invoice_adjustment_amount != 0) {
          let item = {};
          item['name'] = '調整額';
          item['unit_price'] = '-';
          item['unit'] = '式';
          item['qty'] = 1;
          item['total_price'] = invoiceRes.member_invoice_adjustment_amount;
          itemsList.push(item);
        }
        invoiceRes['itemsList'] = itemsList;
        console.log(invoiceRes, 'invoiceRes....')
        setInvoiceData(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      //error not implemented yet
      console.log('Field err', err);
    } finally {
      // processing.current = false;
      setLoading(false);
    }
  }

  function numberWithCommas(x) {
    if (x === '-') {
      return x;
    }
    if (x < 0) {
      return '¥ ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x ? '¥ ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  }
  function calculateReciptDate(invoiceInfo) {
    let strDate = String(invoiceInfo.member_invoice_month_temp);
    let tempDate = new Date(strDate.substring(0, 4), strDate.substring(4), "01");
    let receiptDate = '';
    console.log('strDate',strDate);
    console.log('tempDate',tempDate);
    console.log('invoiceInfo.member_invoice_payment_method',invoiceInfo.member_invoice_payment_method);
    if (invoiceInfo.member_invoice_payment_method == 1) {
        tempDate.setDate(27);
        strDate = Math.floor(tempDate.getTime() / 1000);
        console.log("😡😡😡😡😡😡😡😡💦💦😡😡😡😡😡 tempDate20", tempDate);
        receiptDate = timestampToJpDate(strDate);
    } else if (invoiceInfo.member_invoice_payment_method == 2) {
        tempDate.setDate(20);
        strDate = Math.floor(tempDate.getTime() / 1000);
        console.log("😡😡😡😡😡😡😡💦💦💦💦😡😡😡😡 tempDate27", tempDate)
        // strDate = 1600000000;
        receiptDate = timestampToJpDate(strDate);
    }
    console.log('receiptDate',receiptDate);
    return receiptDate;
  }
  function timestampToJpDate(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = Number(date.getMonth() + 1);
      const day = Number(date.getDate());
      return `${year}年${month}月${day}日`;
    }
  }

  // Member name font-size customization
  useEffect(() => {
    const container = document.getElementById("memberNameContainer");
    const textElement = document.getElementById("memberName");

    let fontSize = 36;

    while (textElement.scrollWidth > container.clientWidth) {
      fontSize--;
      textElement.style.fontSize = (fontSize - 10) + "px";
    }
  }, [memberText]);

  return (
    <>
      {loading && <Loader />}
      <div className="canvascomponent">
        <CanvasComponent />
        <div className="container">
          <div className="page">
            {/* <div class="contents" className="flex">
            <div className="arrowlogo"><img src="/arrowlogo.png"/></div>
              <div className=" h-10 text-4xl text-[#707070]"></div>
              <div class="item" className="w-60 h-10 ml-8 text-4xl text-right text-[#707070]" >2023年4月期</div>
              <div className="h-10 ml-4 text-4xl text-[#707070]">御請求書</div>
              <div  className="arrowstamp"><img src="/arrowstamp.png"/></div>
            </div> */}

            <div className="flex justify-between">
              <div className="contents">
                <div className="arrowlogo"><img src="/arrowlogo.png" /></div>
                <div className="lightfont mt-4 ml-4 customInvoiceTitle text-4xl whitespace-nowrap text-right font-bold" >{invoiceData.member_invoice_month} 御請求書</div>
                <div className="">
                  <div className="w-44 dateTitleReceipt text-right">発行日 : {timestampToJpDate(invoiceData.member_invoice_date_of_issue)}</div>
                </div>
                <div className="arrowstamp"><img src="/arrowstamp.png" /></div>
              </div>
            </div>

            <div className="lightfont ml-7 text-xs">下記の通り御請求申し上げます</div>
            <div className="flex">
              <div className="contents" >
                <div className="lightfont w-36 mt-2 laterSpacing text-left ml-7 text-xl font-bold">御請求総額</div>
                <div className="width230 mt-0.5 text-right text-3xl font-bold">{numberWithCommas(invoiceData.member_invoice_total_payment)}</div>
                <div className="lightfont w-24 mt-2 pl-2 text-xl font-bold">(税込)</div>
                <div className="flex justify-end" id="memberNameContainer">
                  <div className="lightfont w-96 whitespace-nowrap text-4xl text-right font-bold" id="memberName">
                    {invoiceData.member_name} 様
                  </div>
                </div>
              </div>
            </div>
            <div className="lightfont dateColWidth335 h-8 text-xs text-right">
              {invoiceData.member_invoice_payment_method === 1 ? 'お支払い期限' : '口座引落日' }: {calculateReciptDate(invoiceData)}
              {invoiceData.member_invoice_payment_method === 2 && (
                  <><br/><p>金融機関が休業日の場合翌営業日となります</p></>
              )}
            </div>
            {/* <div className="lightfont w-96 text-xs text-right">金融機関が休業日の場合翌営業日となります</div> */}
            {/*口座引落日：2023年5月27日
            金融機関が休業日の場合翌営業日となります*/}


            <div className="lightfont">
              <div className="mr-2 flex justify-end">
                <div className="mt-4 pb-4 w-52 text-xs text-center border-b-2 border-dotted border-gray-300">項目</div>
                <div className="mt-4 pb-4 w-32 text-xs text-center border-b-2 border-dotted border-gray-300">単価</div>
                <div className="mt-4 pb-4 w-10 text-xs text-center border-b-2 border-dotted border-gray-300">数</div>
                <div className="mt-4 pb-4 w-10 text-xs text-center border-b-2 border-dotted border-gray-300">単位</div>
                <div className="mt-4 pb-4 w-24 text-xs text-center border-b-2 border-dotted border-gray-300">金額</div>
              </div>
              {/* <div className="itemlist grid grid-flow-row auto-rows-fr"> */}
              <div className="itemlist">
                {invoiceData.itemsList && Array(6).fill().map((_, index) => (
                    <div key={index} className="flex justify-end h-16">
                      <div className="mt-5 pb-4 w-52 text-sm text-left border-b-2 border-dotted border-gray-300">
                        {invoiceData.itemsList[index]?.name}
                      </div>
                      <div className="mt-5 pb-3 w-32 text-center font-bold border-b-2 border-dotted border-gray-300">
                        { invoiceData.itemsList[index]?.unit_price ? `${numberWithCommas(invoiceData.itemsList[index]?.unit_price)}` : '' }
                      </div>
                      <div className="mt-5 pb-4 w-10 text-center border-b-2 border-dotted border-gray-300">
                        {invoiceData.itemsList[index]?.qty}
                      </div>
                      <div className="mt-5 pb-4 w-10 text-center border-b-2 border-dotted border-gray-300">
                        {invoiceData.itemsList[index]?.unit}
                      </div>
                      <div className="mt-4 pb-4 w-24 text-right text-lg font-bold border-b-2 border-dotted border-gray-300">
                        { invoiceData.itemsList[index]?.total_price ? `${numberWithCommas(invoiceData.itemsList[index]?.total_price)}` : '' }
                      </div>
                    </div>
                ))}
              </div>
            </div>

              
            <div className="bottom-52 marginRight6 right-0">
              <div className="flex justify-end">
                <div className="lightfont w-36 text-right text-2xl">合計</div>
                <div className="w-36 text-right text-2xl font-bold">{numberWithCommas(invoiceData.member_invoice_total_payment)}</div>
              </div>
              <div className="flex justify-end">
                <div className="lightfont w-36 text-right text-base">うち消費税({invoiceData.member_invoice_consumption_tax_rate}%)</div>
                <div className="lightfont w-36 text-right text-base">{numberWithCommas(invoiceData.member_invoice_total_consumption_tax)}</div>
              </div>

              <br />
              { invoiceData.member_invoice_payment_method === 1 && (
                <>
                  <div className="mt-2 flex justify-end">
                    <div className="lightfont w-96 text-right border-b-2 border-dotted border-gray-300">お振込先</div>
                  </div>

                  <div className="mt-2 text-xl flex justify-end font-bold">
                    <div>三菱UFJ銀行成城支店</div>
                  </div>
                  <div className="text-xl flex justify-end font-bold">
                    <div>普通0161627</div>
                  </div>
                  <div className="text-xl flex justify-end font-bold">
                    <div className="pb-2 w-96 text-right border-b-2 border-dotted border-gray-300">株式会社アロー</div>
                  </div>
                  <div className="flex justify-end">
                    <div className="lightfont text-xs">※お振込人名には<span className="text-red-600 font-bold">会員様ご本人のお名前</span>を入力お願い致します。</div>
                  </div>
                  <div className="flex justify-end">
                    <div className="lightfont text-xs">お振込手数料はご負担願います。</div>
                  </div>
                </>
              )}
            </div>



            <div className="">
              <div className="absolute bottom-4 left-6 address">
                <div className="text-2xl font-bold">株式会社アロー</div>
                <div className="text-base">〒157-0073</div>
                <div className="text-base">東京都世田谷区砧6-36-3</div>
                <div className="text-base text-right" style={{marginRight: "-1px"}}>信濃屋第一ビル3F</div>
                <div className="text-base">TEL/FAX : 03-5727-8444</div>
                <div className="text-base">MAIL : info@ts-arrow.com</div>
                <div className="text-base">担当 : 阿藤　貴史</div>
                <div className="text-base">登録番号 : T8010901033643</div>
              </div>
              <div className="ml-16 w-72 absolute top910 right-0">
                <div className="remarks mt-4 text-xs">
                  <div dangerouslySetInnerHTML={{ __html: invoiceData.member_invoice_memo }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default InvoiceLayout