export default function Home() {
  return (
    <main>
      <div class="container mx-auto px-4 py-8 bg-blue-300 h-screen">
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold">社内文章検索システム</h1>
          </div>
          <div class="flex flex-col overflow-y-auto h-96 bg-sky-50">
            <div class="flex items-end mb-2">
              <div class="w-8 h-8 bg-gray-300 rounded-full">AI</div>
              <p class="text-gray-800">こんにちは！何か質問はありますか？</p>
            </div>
            <div class="flex items-start mb-2">
              <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
              <p class="text-gray-800">今日は天気がいいですね！</p>
            </div>
          </div>
          <div class="flex bg-sky-50">
            <input type="text" class="flex-grow rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="メッセージを入力" />
            <button class="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">送信</button>
          </div>
        </div>
      </div>
    </main>
  );
}
