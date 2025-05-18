import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import api from '../../API/Api';
import {useNavigation} from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {PermissionsAndroid, Platform} from 'react-native';

const validationSchema = Yup.object().shape({
  mm: Yup.number().required('!').positive('!').integer(),
  yyyy: Yup.number().required('!').positive('!').integer(),
});

const DownloadInvoice = ({route}) => {
  const {employeeId, name} = route.params || {}; // Get employeeId
  const [alertmessage, setAlertmessage] = useState();
  const [buttondisable, setButtondisable] = useState(true);

  const [employeeData, setEmployeeData] = useState({
    name: '',
    age: '',
    phone: '',
    category: '',
    salary: '',
    joinDate: '',
    totalAttend: '',
    totalAdvnce: '',
    totalOvertime: '',
    EPF_ID: '',
    SI_ID: '',
    Net_Salary: '',
    company_name: '',
    company_address: '',
    UAN_no: '',
    bank_Name: '',
    accound_number: '',
    salaryGenerateDate: '',
    salaryMonth: '',
  });

  const FetchInvoiceData = async values => {
    await api
      .post('/salary/FindAllInvoicebyMonth/', {
        employeeId: employeeId,
        M: values.mm,
        Y: values.yyyy,
      })
      .then(res => {
        setAlertmessage('Invoice Available you can Download');
        setEmployeeData(res.data.data)
        if (res.data.success === true) {
          console.log('hello button true');
          setButtondisable(false);
        }

        console.log(res.data.data);
      })
      .catch(err => {
        setAlertmessage('invoice does not exist');
        console.log(err);
        if (err.request.status === 404) {
          console.log('hello button false');
          setButtondisable(true);
        }
      });
  };
  const generatePDF = async () => {
    // Sample employee salary slip data

    const htmlContent = `
        
<html >
  <head>
    <style>
      body {
       padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        font-family: Arial, Helvetica, sans-serif;
        justify-content: center;
        align-items: center;
        display: flex;
      }
      .MainContainer {
        height: 480px;
        width: 600px;
        background-color: rgb(231, 229, 227);
        border: 1px solid black;
      }
      .header {
        height: 80px;
        border: 1px solid black;
        text-align: center;
      }
      h1,
      h3,
      h4 {
        margin: 0;
      }
      .contenttable1 {
        height: 200px;
       
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .tabBox1 {
        height: 180px;
        width: 50%;
       
      }
      table {
        width: 100%;
        
      }
      tr td  {
        border: 1px solid rebeccapurple;
        height: 30px;
      }
    </style>
  </head>
  <body>
    <div class="MainContainer">
      <div class="header">
        <h1>${employeeData.company_name}</h1>
        <h3>${employeeData.company_address}</h3>
        <h4>${employeeData.salaryMonth}</h4>
      </div>
      <div class="contenttable1">
        <div class="tabBox1">
          <table class="tabil1">
            <tr>
              <td style="width: 150px;  ">Employee name</td>
              <td style="width: 150px;  ">:${employeeData.name}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>:${employeeData.phone}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>:${employeeData.age}</td>
            </tr>
            <tr>
              <td>Depertment</td>
              <td>:${employeeData.category}</td>
            </tr>
            <tr>
              <td>Date of Joining</td>
              <td>:${employeeData.joinDate}</td>
            </tr>
          </table>
        </div>
        <div class="tabBox1">
          <table class="tabil1">
            <tr>
              <td style="width: 150px;  ">UAN NO.</td>
              <td style="width: 150px;  ">:${employeeData.UAN_no}</td>
            </tr>
            <tr>
              <td>EPF_ID.</td>
              <td>:${employeeData.EPF_ID}</td>
            </tr>
            <tr>
              <td>SI_ID.</td>
              <td>:${employeeData.SI_ID}</td>
            </tr>
            <tr>
              <td>Bank</td>
              <td>:${employeeData.bank_Name}</td>
            </tr>
            <tr>
              <td>Account No.</td>
              <td>:${employeeData.accound_number}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="contenttable2">
        <table class="tabil1" style="border: 1px solid black; ">
          <tr style="width: 600px;  ">
            <th >Earning</th>
          </tr>
          <tr>
            <td style="width: 150px;  ">Salary:</td>
            <td style="width: 150px;  ">:${employeeData.salary}</td>
          </tr>
          <tr>
            <td>Total Attend</td>
            <td>:${employeeData.totalAttend}</td>
          </tr>
          <tr>
            <td>Total Overtime</td>
            <td>:${employeeData.totalOvertime}</td>
          </tr>
          <tr>
            <td>Total Advance</td>
            <td>:${employeeData.totalAdvnce}</td>
          </tr>
          <tr>
            <td>Net Salary</td>
            <td>:${employeeData.Net_Salary}</td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>

    `;

    try {
      const pdfOptions = {
        html: htmlContent,
        fileName: `salary_slip_${employeeData.name}_${employeeData.salaryMonth}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(pdfOptions);
      alert(`PDF Generated at: ${file.filePath}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.SearchContainer}>
        <Formik
          initialValues={{
            mm: '',
            yyyy: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            FetchInvoiceData(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.Inputbox}>
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('mm')}
                onBlur={handleBlur('mm')}
                value={values.mm}
                style={styles.Day}
                placeholder="MM"></TextInput>
              {touched.mm && errors.mm && (
                <Text style={{color: 'red'}}>{errors.mm}</Text>
              )}
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('yyyy')}
                onBlur={handleBlur('yyyy')}
                value={values.yyyy}
                style={styles.Day}
                placeholder="YYYY"></TextInput>
              {touched.yyyy && errors.yyyy && (
                <Text style={{color: 'red'}}>{errors.yyyy}</Text>
              )}
              <TouchableOpacity onPress={handleSubmit} style={styles.Button}>
                <Text style={styles.Check}>Check</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.TotalDataBox}>
          <Text style={styles.TotalData}>Show invoive</Text>
        </View>
      </View>
      <View style={styles.InvoiceShowBox}>
        <View style={styles.downloadBox}>
          <Text style={styles.EmployeeName}>{name}</Text>
          <Text style={styles.Messages}>{alertmessage}</Text>
          <TouchableOpacity
            onPress={generatePDF}
            disabled={buttondisable}
            style={styles.DownloadButton}>
            <View style={styles.dBox1}>
              <Image
                source={require('../../TabBaricons/downloading.png')}
                style={styles.downloadicon}
              />
            </View>
            <View style={styles.dBox2}>
              <Text style={styles.buttontext}>Download</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DownloadInvoice;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  SearchContainer: {
    height: 120,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    // backgroundColor:"orange"
  },
  Inputbox: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TotalDataBox: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TotalData: {
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
  },
  ShowContainer: {
    flex: 1,
    alignItems: 'center',
  },

  Day: {
    height: 40,
    width: 80,
    fontSize: 18,
    borderWidth: 0.5,
    borderRadius: 2,
    // backgroundColor:"blue"
  },
  Button: {
    height: 40,
    width: 100,
    borderRadius: 8,
    backgroundColor: 'green',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Check: {
    fontSize: 19,
    color: '#FAFAFA',
  },
  InvoiceShowBox: {
    flex: 1,
    alignItems: 'center',
  },
  downloadBox: {
    height: 170,
    width: '90%',
    backgroundColor: '#FAA300',

    alignItems: 'center',
    elevation: 10,
    borderRadius: 10,
    marginTop: 24,
  },
  EmployeeName: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fafafa',
    marginTop: 10,
  },
  Messages: {
    fontSize: 19,
    color: '#fafafa',
  },
  DownloadButton: {
    height: 60,
    width: 260,
    backgroundColor: '#fafafa',
    marginTop: 8,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  downloadicon: {
    height: 50,
    width: 50,
    tintColor: '#FAA300',
  },
  dBox1: {
    height: 55,
    width: '23%',
    // backgroundColor:"green"
    alignItems: 'center',
    justifyContent: 'center',
  },
  dBox2: {
    height: 55,
    width: '77%',
    // backgroundColor:"red",
    // alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginLeft: 12,
  },
});
