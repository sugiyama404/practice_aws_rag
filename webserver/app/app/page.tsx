//@ts-ignore
import { Form } from './components/form';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="flex flex-col border border-gray-300 rounded-lg h-screen">
          <div className="flex flex-row items-center bg-gray-800 py-4 text-white rounded-t-lg">
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold text-center font-bold">社内文章検索システム</h3>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </main>
  );
}
