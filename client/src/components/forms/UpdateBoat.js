import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button } from 'antd'
// import { UPDATE_PERSON } from '../../queries'
import { UPDATE_BOAT } from '../../queries'; 

const UpdateBoat = props => {
  const [id] = useState(props.id)
//   const [firstName, setFirstName] = useState(props.firstName)
//   const [lastName, setLastName] = useState(props.lastName)
const [year, setYear] = useState(props.year)
const[make, setMake] = useState(props.make)
const[model, setModel] = useState(props.model)
const[price, setPrice] = useState(props.price)
const[personId, setPersonId] = useState(props.personId)
  const [updateBoat] = useMutation(UPDATE_BOAT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values
    updateBoat({
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
        updatePerson: {
          __typename: 'Boat',
          id,
          year,
          make,
          model,
          price,
          personId
        }
      }
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
        case 'year':
          setYear(value)
          break
        case 'make':
          setMake(value)
          break
         case 'model':
           setModel(value)
           break
           case 'price':
              setPrice(value)
              break
          case 'personId':
              setPersonId(value)
              break
        default:
          break
      }
  }

  return (
    <Form
      form={form}
      name='update-boat-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId
      }}
      size='large'
    >
              <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input the boat year!' }]}
      >
        <Input placeholder='i.e. 2015'
                onChange={e => updateStateVariable('year', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input the boat make!' }]}
      >
        <Input placeholder='i.e. Sail Boat'
        onChange={e => updateStateVariable('make', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input the boat model!' }]}
      >
        <Input placeholder='i.e. 3.5' 
        onChange={e => updateStateVariable('model', e.target.value)}/>
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input the boat price!' }]}
      >
        <Input placeholder='i.e. $20,000' onChange={e => updateStateVariable('price', e.target.value)}/>
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input the personId!' }]}
      >
        <Input placeholder='i.e. Bill' onChange={e => updateStateVariable('personId', e.target.value)}/>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) &&
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Boat
          </Button>
        )}
      </Form.Item>
      {/* <Form.Item
        name='firstName'
        label='First Name'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input
          placeholder='i.e. John'
          onChange={e => updateStateVariable('firstName', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name='lastName'
        label='Last Name'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input
          placeholder='i.e. Smith'
          onChange={e => updateStateVariable('lastName', e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') &&
                !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item> */}
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateBoat
