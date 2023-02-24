import React, { useState } from "react";
import { Card, Table } from "@tencent/tea-component-mobile";

const { sortable, radioable } = Table.addons;

export const records = [
  {
    name: "Link",
    age: 20,
    contact: { phone: "88886666", mail: "link@qq.com" },
  },
  {
    name: "Zelda",
    age: 18,
    contact: { phone: "66668888", mail: "zelda@qq.com" },
  },
  {
    name: "Mario",
    age: 38,
    contact: { phone: "88881111", mail: "mario@qq.com" },
  },
  {
    name: "Luigi",
    age: 48,
    contact: { phone: "8123456", mail: "luigi@qq.com" },
  },
];

export default function TableExample() {
  const [sorts, setSorts] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  return (
    <div className="page">
      <label className="header">Table 表格</label>
      <Card>
        <Card.Body title="基本用法">
          <Table
            columns={[
              { key: "name", header: "姓名" },
              { key: "age", header: "年龄" },
              { key: "contact.mail", header: "邮箱" },
              { key: "contact.phone", header: "电话" },
            ]}
            records={records}
            recordKey="name"
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body title="插件用法">
          <Table
            columns={[
              { key: "name", header: "姓名" },
              { key: "age", header: "年龄" },
              { key: "contact.mail", header: "邮箱" },
              { key: "contact.phone", header: "电话" },
            ]}
            records={[...records].sort(sortable.comparer(sorts))}
            recordKey="name"
            rowDisabled={record => record.name === "Zelda"}
            addons={[
              sortable({
                columns: ["name"],
                value: sorts,
                onChange: value => setSorts(value),
              }),
              radioable({
                value: selectedKey,
                rowSelect: true,
                onChange: (key, context) => {
                  console.log(key, context);
                  setSelectedKey(key);
                },
              }),
            ]}
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body title="对齐方式">
          <Table
            columns={[
              { key: "name", header: "姓名" },
              { key: "age", header: "年龄", align: "center" },
              { key: "contact.mail", header: "邮箱", align: "center" },
              { key: "contact.phone", header: "电话", align: "right" },
            ]}
            records={records}
            recordKey="name"
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body title="横向滚动" subtitle="(设置列宽)">
          <Table
            layout="fixed"
            columns={[
              { key: "name", header: "姓名", align: "center", width: 240 },
              { key: "age", header: "年龄", align: "center", width: 240 },
              {
                key: "contact.mail",
                header: "邮箱",
                align: "center",
                width: 360,
              },
              {
                key: "contact.phone",
                header: "电话",
                align: "center",
                width: 280,
              },
            ]}
            records={records}
            recordKey="name"
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body title="横向滚动" subtitle="(设置表格宽)">
          <Table
            width={1000}
            columns={[
              { key: "name", header: "姓名", align: "center" },
              { key: "age", header: "年龄", align: "center" },
              { key: "contact.mail", header: "邮箱", align: "center" },
              { key: "contact.phone", header: "电话", align: "center" },
            ]}
            records={records}
            recordKey="name"
          />
        </Card.Body>
      </Card>
    </div>
  );
}
