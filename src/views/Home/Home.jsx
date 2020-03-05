import React from 'react';
import Helmet from 'react-helmet';
import { Link, useParams, useLocation } from 'react-router-dom';

import SearchBox from "../../components/molecules/search-box";
import { AZListArray, queryType } from "../../constants";
import { useAppPaths } from "../../hooks/routing";
import { useStateValue } from "../../store/store.js";
import TermList from "../Terms";
import NoMatchingResults from "../Terms/NoMatchingResults";

const Home = () => {
  const [{ dictionaryTitle }] = useStateValue();
  const { DefinitionPath, HomePath } = useAppPaths();
  const location = useLocation();
  const params = useParams();
  const { pathname } = location;
  const isExpand = pathname.includes(`/${queryType.EXPAND}`);
  const { expandChar } = params;
  // Set default query param for home page when expand char is not defined
  const query = expandChar ? expandChar : AZListArray[0].toUpperCase();
  // Render TermList ( true when expand route has parameter or on home page )
  const renderTermList = ( isExpand && expandChar ) || pathname === HomePath();

  const renderHelmet = () => {
      let retHead = <></>;
      // Add noindex directive for robots for /expand routes
      if ( isExpand ) {
          retHead = <Helmet><meta name="robots" content="noindex" /></Helmet>;
      }
      return retHead;
  };

  console.log('Home:', isExpand, expandChar, params, location);
  return (
    <div>
        { renderHelmet() }
        <h1>{dictionaryTitle}</h1>
        <div>
            Hello World
        </div>
        <div>
            <Link to={DefinitionPath({ idOrName: '12345' })}>Test Definition Link</Link>
        </div>
        <SearchBox />
        {/*
        -----------------------------------------------------------------------------------------
            Render TermList if renderTermList flag is true (expand route with param or home),
            if on expand route without expand param render NoMatchingResults,
            otherwise render blank.
        -----------------------------------------------------------------------------------------
        */}
        { renderTermList
            ? <TermList query={ query } />
            : isExpand && !expandChar
                ? <NoMatchingResults />
                : ''
        }
    </div>
  );
};

export default Home;
