// url:domain.com/news/something
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
const DetailPage = () => {
  /**
   * 用 useRouter 取得url 路徑後的id
   * 使用 router.query.testId 來取得
   * 因為 newsId 是 我們這個檔案的名稱 [testId]
   * 在這個檔案就是取得 domain.com/test/something 裡面的something
   */
  const router = useRouter();
  console.log('router', router.query.testId);
  const testId = router.query.testId;
  return (
    <Fragment>
      <h1>Test Detail Page </h1>
      <p>{testId}</p>
      <button>
        <Link href="/test">Go Back</Link>
      </button>
    </Fragment>
  );
};

export default DetailPage;
