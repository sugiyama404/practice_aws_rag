export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="flex flex-col border border-gray-300 rounded-lg h-screen">
          <div className="flex flex-row items-center bg-gray-800 py-4 text-white rounded-t-lg">
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold">ユーザー名</h3>
            </div>
          </div>
          <div className="flex-grow overflow-auto p-4">
            <div className="flex flex-row mb-4">
              <div className="flex-grow ml-4 bg-gray-200 rounded-lg p-2">
                <p>メッセージ内容</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row bg-gray-800 py-4 rounded-b-lg">
            <input type="text" className="flex-grow px-4 py-2 rounded-l-lg" placeholder="メッセージを入力" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-r-lg">送信</button>
          </div>
        </div>
      </div>
    </main>
  );
}
