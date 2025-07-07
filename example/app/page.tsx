export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">NextJS Tagger Example</h1>
      
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          This page demonstrates the nextjs-tagger plugin in action.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Try this:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open browser developer tools</li>
            <li>Inspect any HTML element on this page</li>
            <li>Look for the <code className="bg-gray-100 px-1 rounded">data-loc-id</code> attribute</li>
            <li>Use the location info to tell AI exactly where to make changes!</li>
          </ol>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded-lg shadow">
            <h3 className="font-semibold">Interactive Elements</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Click Me
            </button>
            <input 
              type="text" 
              placeholder="Type something..." 
              className="border rounded px-3 py-2 mt-2 w-full"
            />
          </div>
          
          <div className="bg-white p-4 border rounded-lg shadow">
            <h3 className="font-semibold">More Elements</h3>
            <ul className="mt-2 space-y-1">
              <li>List item 1</li>
              <li>List item 2</li>
              <li>List item 3</li>
            </ul>
          </div>
        </div>
        
        <footer className="text-center text-gray-500 mt-8">
          <p>Each HTML element above has a data-loc-id attribute! 🎯</p>
        </footer>
      </div>
    </div>
  );
}