import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { Form, Input, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

// import { ADD_PERSON, GET_PEOPLE } from '../../queries'
import { ADD_BOAT, GET_BOATS } from '../../queries';


const AddBoat = () => {
  const [id] = useState(uuidv4())
  const [addBoat] = useMutation(ADD_BOAT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
      console.log("ON FINISH")
//     const { firstName, lastName } = values
const { year, make, model, price, personId } = values

    addBoat ({
        variables: {
            id,
            year,
            make,
            model,
            price,
            personId
        },
        optimisticResponse: {
            __typename: 'Mutation',
            addBoat: {
              __typename: 'Boat',
              id,
              year,
              make,
              model,
              price,
              personId,
            }
          },
          update: (proxy, { data: { addBoat } }) => {
            const data = proxy.readQuery({ query: GET_BOATS })
            proxy.writeQuery({
              query: GET_BOATS,
              data: {
                ...data,
                boats: [...data.boats, addBoat]
              }
            })
          }
    })

    console.log("data", values)

  }

  return (
    <Form
      form={form}
      name='add-boat-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input the boat year!' }]}
      >
        <Input placeholder='i.e. 2015' />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input the boat make!' }]}
      >
        <Input placeholder='i.e. Sail Boat' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input the boat model!' }]}
      >
        <Input placeholder='i.e. 3.5' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input the boat price!' }]}
      >
        <Input placeholder='i.e. $20,000' />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input the personId!' }]}
      >
        <Input placeholder='i.e. Bill' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Boat
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddBoat
