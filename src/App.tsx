import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {read, utils, writeFile} from "xlsx";
import {Message, Upload} from "@arco-design/web-react";
import '@arco-design/web-react/dist/css/arco.min.css'

function App() {

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React + SheetJs</h1>
            <div className="card">
                <button onClick={() => {
                    const worksheet = utils.json_to_sheet([
                        {name: "George Washington", birthday: "1732-02-22"},
                        {name: "John Adams", birthday: "1735-10-19"},
                    ]);

                    const workbook = utils.book_new();
                    utils.book_append_sheet(workbook, worksheet, "Dates");

                    writeFile(workbook, "Presidents.xlsx", {compression: true});
                }}>
                    Download Excel
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <Upload
                multiple
                action='/'
                beforeUpload={async (file) => {
                    const fileBuffer = await file.arrayBuffer()
                    const workbook = read(fileBuffer)

                    console.log(workbook.SheetNames)
                    console.log(workbook.Sheets)
                    const first_sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const json = utils.sheet_to_json(first_sheet)
                    Message.success(JSON.stringify(json))
                    return Promise.reject();
                }}
            />
        </>
    )
}

export default App
