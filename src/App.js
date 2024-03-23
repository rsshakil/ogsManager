import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RouteConf } from './router/RouteConf';
import { useRecoilValue } from 'recoil';
import { isMatchedPageLoading, isStoppeddPageLoading } from './store/pageLoadiongState';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router';
import Loader from './components/atoms/Loading/Loader';
import axios from "axios";
import usePageLoader from './hooks/usePageLoader';
import getUnixTime from 'date-fns/getUnixTime';
import customMessages from './customMessages.json';
// import jaMessages from 'devextreme/localization/messages/ja.json';
import { loadMessages, locale } from "devextreme/localization";
import useAuthPersist from './hooks/useAuthPersist';

locale("ja-JP");
function App() {
  // loadMessages(jaMessages);
  loadMessages(customMessages);
  const location = useLocation();
  const navigate = useNavigate();

  let { pathname } = location;
  pathname = pathname.substring(1);

  const authPersist = useAuthPersist();

  const start = Date.now();

  const isPageLoading = useRecoilValue(isMatchedPageLoading(pathname));
  const isStoppedPageLoading = useRecoilValue(isStoppeddPageLoading(pathname));

  const end = Date.now();
  console.log(`Execution time: ${end - start} ms`);

  const [pageLoadingEnded, setPageLoadingEnded] = useState(false);
  const { resetPageLoader } = usePageLoader(pathname);

  let timerRef = React.useRef(null);

  //execute when reload page by browser btn then reset
  useLayoutEffect(() => {
    resetPageLoader(pathname);
    const env = process.env.REACT_APP_ENVIRONMENT;
    const domain = (new URL(window.location.href)).hostname;
    if (env === 'cardel-develop') {
      document.body.classList.add('black-theme');
    }
    else if (env === 'adad-develop') {
      document.body.classList.add('gray-theme');
    }
    else if (env === 'cardel-staging') {
      document.body.classList.add('purple-theme');
    }
    else if (env === 'adad-staging') {
      document.body.classList.add('orange-theme');
    }
    else if (env == 'cardel-product') {
    }
    else if (env == 'adad-product') {
      document.body.classList.add('navy-blue-theme');
    }
  }, [])

  useEffect(() => {
    // console.log('page loading check : ', isPageLoading)
    // console.log('page loading check >> pathname : ', pathname)

    //start page loader
    if (isPageLoading === 0) {
      document.body.classList.add("overflow-hidden", "h-screen", "w-screen", "fixed");
      //reset page loader
      resetPageLoader(pathname);

      timerRef.current = setTimeout(() => {
        document.body.classList.remove("overflow-hidden", "h-screen", "w-screen", "fixed");
        navigate('/500');
      }, 25000); //120s[120000] 25s[25000]

      return () => clearTimeout(timerRef.current);
    }
    // page loader not applicable for the curren page
    else {
      document.body.classList.remove("overflow-hidden", "h-screen", "w-screen", "fixed");
      if (timerRef.current) clearTimeout(timerRef.current);
    }

  }, [isPageLoading, location])

  useEffect(() => {
    //if stopped page loader reset classes
    if (isStoppedPageLoading) {
      document.body.classList.remove("overflow-hidden", "h-screen", "w-screen", "fixed");
      if (timerRef.current) clearTimeout(timerRef.current);
    }

  }, [isStoppedPageLoading])


  useEffect(() => {
    ///////////////check network is alive/not/////////////////////
    axios.get('/favicon.ico' + `?v=${getUnixTime(new Date())}`).then(res => {
      console.log('sssss', res)
    }).catch(err => {
      console.log('navigate to 500 ....', err);

      if (pathname != '500' && err == 'Network Error') {
        navigate('/500');
      }
    })

  }, [location])


  // const appStates = useRecoilValue(appState);
  // const appId = appStates.appId
  // useEffect(() => {
  //   // 通信処理 APPにカウントする
  //   try {
  //     const result = axios.put(queries.baseURL + queries.accessApp + appId);
  //     console.log('app count up success', result)
  //   }
  //   catch (err) {
  //     console.log('app count up err', err)
  //   }
  // }, []);

  // console.log('>>>>>>>>>>>>>>>>>>>>>>------ isPageLoading', isPageLoading)
  // console.log('>>>>>>>>>>>>>>>>>>>>>>------pageLoadingEnded', pageLoadingEnded)

  return (
    <>
      {(isPageLoading === 0 && !isStoppedPageLoading) && <Loader />}

      {/* <ErrorBoundary>
        <RouteConf />
      </ErrorBoundary> */}
      {authPersist && <RouteConf />}
    </>
  )
}

export default App;