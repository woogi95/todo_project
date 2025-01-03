import { useEffect, useState } from "react";
import "./gridlevel0.css";

import { getGridData } from "../../apis/grid";
import GridLevel1_Main from "./GridLevel1_Main";

function GridLevel0({ projectId }) {
  console.log("projectId", projectId);
  // const [isPatch, setIsPatch] = useState(false);
  // console.log(isPatch);
  const getGridApiCall = async () => {
    const tempDatas = await getGridData(projectId);
    setMandalart(tempDatas.mandalart);
    // setIsPatch(true);
    setNormalData([
      // ...resultData.mandalart

      //0-8
      [
        {
          // 고유 값
          ...tempDatas.mandalart[9],
          cellId: "cell-0-0-0-0",
          // 연동
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[10],
          cellId: "cell-0-0-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[11],
          cellId: "cell-0-0-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[12],
          cellId: "cell-0-0-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[1],
          cellId: "cell-0-0-1-1",
          isActive: true,
          isbindKey: "cell-1-1-0-0",
        },
        {
          ...tempDatas.mandalart[13],
          cellId: "cell-0-0-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[14],
          cellId: "cell-0-0-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[15],
          cellId: "cell-0-0-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[16],
          cellId: "cell-0-0-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
      //9-17
      [
        {
          ...tempDatas.mandalart[17],
          cellId: "cell-0-1-0-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[18],
          cellId: "cell-0-1-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[19],
          cellId: "cell-0-1-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[20],
          cellId: "cell-0-1-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[2],
          cellId: "cell-0-1-1-1",
          isActive: false,
          isbindKey: "cell-1-1-0-1",
        },
        {
          ...tempDatas.mandalart[21],
          cellId: "cell-0-1-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[22],
          cellId: "cell-0-1-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[23],
          cellId: "cell-0-1-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[24],
          cellId: "cell-0-1-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
      //18-26
      [
        {
          ...tempDatas.mandalart[25],
          cellId: "cell-0-2-0-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[26],
          cellId: "cell-0-2-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[27],
          cellId: "cell-0-2-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[28],
          cellId: "cell-0-2-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[3],
          cellId: "cell-0-2-1-1",
          isActive: false,

          isbindKey: "cell-1-1-0-2",
        },
        {
          ...tempDatas.mandalart[29],
          cellId: "cell-0-2-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[30],
          cellId: "cell-0-2-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[31],
          cellId: "cell-0-2-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[32],
          cellId: "cell-0-2-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
      //27-35
      [
        {
          ...tempDatas.mandalart[33],
          cellId: "cell-1-0-0-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[34],
          cellId: "cell-1-0-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[35],
          cellId: "cell-1-0-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[36],
          cellId: "cell-1-0-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[4],
          cellId: "cell-1-0-1-1",
          isActive: false,
          isbindKey: "cell-1-1-1-0",
        },
        {
          ...tempDatas.mandalart[37],
          cellId: "cell-1-0-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[38],
          cellId: "cell-1-0-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[39],
          cellId: "cell-1-0-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[40],
          cellId: "cell-1-0-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
      //36-44
      [
        {
          ...tempDatas.mandalart[1],
          cellId: "cell-1-1-0-0",
          isActive: true,
          isbindKey: "cell-0-0-1-1",
        },
        {
          ...tempDatas.mandalart[2],
          cellId: "cell-1-1-0-1",
          isActive: true,
          isbindKey: "cell-0-1-1-1",
        },
        {
          ...tempDatas.mandalart[3],
          cellId: "cell-1-1-0-2",
          isActive: true,
          isbindKey: "cell-0-2-1-1",
        },
        {
          ...tempDatas.mandalart[4],
          cellId: "cell-1-1-1-0",
          isActive: true,
          isbindKey: "cell-1-0-1-1",
        },
        {
          ...tempDatas.mandalart[0],
          cellId: "cell-1-1-1-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[5],
          cellId: "cell-1-1-1-2",
          isActive: true,
          isbindKey: "cell-1-2-1-1",
        },
        {
          ...tempDatas.mandalart[6],
          cellId: "cell-1-1-2-0",
          isActive: true,
          isbindKey: "cell-2-0-1-1",
        },
        {
          ...tempDatas.mandalart[7],
          cellId: "cell-1-1-2-1",
          isActive: true,
          isbindKey: "cell-2-1-1-1",
        },
        {
          ...tempDatas.mandalart[8],
          cellId: "cell-1-1-2-2",
          isActive: true,
          isbindKey: "cell-2-2-1-1",
        },
      ],
      //45-53
      [
        {
          ...tempDatas.mandalart[41],
          cellId: "cell-1-2-0-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[42],
          cellId: "cell-1-2-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[43],
          cellId: "cell-1-2-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[44],
          cellId: "cell-1-2-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[5],
          cellId: "cell-1-2-1-1",
          isActive: false,
          isbindKey: "cell-1-1-1-2",
        },
        {
          ...tempDatas.mandalart[45],
          cellId: "cell-1-2-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[46],
          cellId: "cell-1-2-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[47],
          cellId: "cell-1-2-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[48],
          cellId: "cell-1-2-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
      //54-62
      [
        {
          ...tempDatas.mandalart[49],
          cellId: "cell-2-0-0-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[50],
          cellId: "cell-2-0-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[51],
          cellId: "cell-2-0-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[52],
          cellId: "cell-2-0-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[6],
          cellId: "cell-2-0-1-1",
          isActive: false,
          isbindKey: "cell-1-1-2-1",
        },
        {
          ...tempDatas.mandalart[53],
          cellId: "cell-2-0-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[54],
          cellId: "cell-2-0-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[55],
          cellId: "cell-2-0-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[56],
          cellId: "cell-2-0-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
      //63-71
      [
        {
          ...tempDatas.mandalart[57],
          cellId: "cell-2-1-0-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[58],
          cellId: "cell-2-1-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[59],
          cellId: "cell-2-1-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[60],
          cellId: "cell-2-1-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[7],
          cellId: "cell-2-1-1-1",
          isActive: false,
          isbindKey: "cell-1-1-2-2",
        },
        {
          ...tempDatas.mandalart[61],
          cellId: "cell-2-1-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[62],
          cellId: "cell-2-1-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[63],
          cellId: "cell-2-1-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[64],
          cellId: "cell-2-1-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
      //72-80
      [
        {
          ...tempDatas.mandalart[65],
          cellId: "cell-2-2-0-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[66],
          cellId: "cell-2-2-0-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[67],
          cellId: "cell-2-2-0-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[68],
          cellId: "cell-2-2-1-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[8],
          cellId: "cell-2-2-1-1",
          isActive: false,
          isbindKey: "cell-1-1-2-2",
        },
        {
          ...tempDatas.mandalart[69],
          cellId: "cell-2-2-1-2",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[70],
          cellId: "cell-2-2-2-0",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[71],
          cellId: "cell-2-2-2-1",
          isActive: false,
          isbindKey: null,
        },
        {
          ...tempDatas.mandalart[72],
          cellId: "cell-2-2-2-2",
          isActive: false,
          isbindKey: null,
        },
      ],
    ]);
    // console.log("tempData : ", tempDatas.mandalart);
    // console.log("tempData : ", tempDatas.mandalart[10]?.completedFg);
  };

  const [mandalart, setMandalart] = useState([]);
  const [normalData, setNormalData] = useState([]);
  // console.log(normalData);

  useEffect(() => {
    getGridApiCall();
  }, []);

  // useEffect(() => {
  //   getGridData();
  //   // console.log(getGridData.data);
  //   // console.log("normalData : ", normalData);
  // }, [normalData]);

  return (
    <div className="cbox">
      <div className="container">
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={0}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={1}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={2}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={3}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={4}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={5}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={6}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={7}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
        <div className="item">
          <GridLevel1_Main
            normalDataIndex={8}
            normalData={normalData}
            setNormalData={setNormalData}
            projectId={projectId}
            getGridApiCall={getGridApiCall}
          />
        </div>
      </div>
    </div>
  );
}

export default GridLevel0;
