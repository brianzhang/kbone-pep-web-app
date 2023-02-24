import React from "react";
import { Button, Card, ImageUpload } from "@tencent/tea-component-mobile";
import { image1, image2, example } from "./image";
import "./index.less";

export default function UploadExample() {
  return (
    <div className="page">
      <label className="header">Upload 上传</label>
      <Card>
        <Card.Body title="基本用法">
          <ImageUpload url="https://run.mocky.io/v3/68ed7204-0487-4135-857d-0e4366b2cfad" />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body title="背景示例">
          <ImageUpload.Group>
            <ImageUpload
              tips="人像面"
              backgroundImage={image1}
              url="https://run.mocky.io/v3/68ed7204-0487-4135-857d-0e4366b2cfad"
            />
            <ImageUpload
              tips="国徽面"
              backgroundImage={image2}
              url="https://run.mocky.io/v3/68ed7204-0487-4135-857d-0e4366b2cfad"
            />
          </ImageUpload.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body title="图片示例">
          <ImageUpload.Group>
            <ImageUpload
              tips="证件"
              url="https://run.mocky.io/v3/68ed7204-0487-4135-857d-0e4366b2cfad"
            />
            <ImageUpload tips="示例" url="" image={example} readonly />
          </ImageUpload.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body title="自定义触发组件">
          <ImageUpload url="https://run.mocky.io/v3/68ed7204-0487-4135-857d-0e4366b2cfad">
            {({ loading }) => (
              <Button type="primary" size="sm" loading={loading}>
                点击上传
              </Button>
            )}
          </ImageUpload>
        </Card.Body>
      </Card>
    </div>
  );
}
