import React, { useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3, Vector4, Color4 } from "@babylonjs/core";
import { useEffect } from "react";
import { Texture } from "@babylonjs/core";


var columns = 6;
var rows = 1;

// UV Mapping for each face of the box
var faceUV = new Array(6);

// Set UV coordinates for each face
for (var i = 0; i < 6; i++) {
  faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
}


const SpinningBox = (propss) => {

  const materialRef = useRef();
  useEffect(() => {
    if (propss.dataUrl_second) {

      const texture = new Texture(propss.dataUrl_second, Scene.current);
      materialRef.current.diffuseTexture = texture;
    }
  }, [propss.dataUrl_second]);

  return (

    <box
      name={propss.name}
      size={2}
      position={propss.position}
      height={1}
      width={1}
      depth={0.5}
      faceUV={faceUV}
      wrap
    >
      <standardMaterial ref={materialRef} />
    </box>

  );
};

const SceneWithSpinningBoxes = (props) => {

  return (

    <div className="SceneWithSpinningBoxes-css" style={{ height: "100%", border: "10px solid #8CABFF", overflow: "hidden"}}>
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene clearColor={new Color4(0, 0, 0, 1)} >
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={(3 * Math.PI) / 4}
            beta={Math.PI / 4}
            radius={3}
          />

          <hemisphericLight
            name="light1"
            intensity={5}
            direction={Vector3.Up()}
          />

          <hemisphericLight
            name="light2"
            intensity={5}
            direction={Vector3.Down()}
          />

          
          <SpinningBox
            name="left"
            position={new Vector3(0, 0, 0)}
            color={Color3.FromHexString("#FFFFFF")}
            dataUrl_second={props.dataUrl}
          />

        </Scene>
      </Engine>
    </div>

  );

}
export default SceneWithSpinningBoxes;
