// url:domain.com/test
import { Fragment } from 'react';
import Link from 'next/link';
const TestPage = () => {
  /**
   *使用 Link  在跳轉頁面的時候是SPA的概念，由 react 來控制，換言之就是不會重新刷新頁面
   *使用 a tag 在跳轉頁面的時候是非SPA的概念，由 瀏覽器 來控制，換言之就是會重新刷新頁面
   */
  return (
    <Fragment>
      <h1>The Test Page </h1>
      <ul>
        <li>
          <Link href="/test/use-Link-component">
            Use Link Component( rerender by a react)
          </Link>
        </li>
        <li>
          <a href="/test/use-a-tag">Use a Tag ( rerender by a browser)</a>
        </li>
      </ul>
    </Fragment>
  );
};
export default TestPage;
