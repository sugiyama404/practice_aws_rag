export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4 py-8 bg-blue-300 h-screen">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">社内文章検索システム</h1>
          </div>
          <div className="flex flex-col overflow-y-auto h-96 bg-sky-50">
            <div className="flex items-end mb-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full">AI</div>
              <p className="text-gray-800">こんにちは！何か質問はありますか？</p>
            </div>
            <div className="flex items-start mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <p className="text-gray-800">今日は天気がいいですね！</p>
            </div>
          </div>
          <div className="flex bg-sky-50">
            <input type="text" className="flex-grow rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="メッセージを入力" />
            <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">送信</button>
          </div>
        </div>
      </div>
    </main>
  );
}
