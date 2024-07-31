import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Button, Text, FlatList  } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { fetchTimetable } from '@/services/api';
import { AntDesign } from '@expo/vector-icons';
import {router} from 'expo-router';

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertToCSV = (data) => {
    const csvRows = data.map(row => row.join(',')).join('\n');
    return `Day,Period 1,Period 2,Period 3,Period 4,Period 5,Period 6,Period 7,Period 8,Period 9,Period 10\n${csvRows}`;
  };

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const data = await fetchTimetable();
        console.log("Response from backend", data)

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const periods = Array.from({ length: 10 }, (_, i) => `Period ${i + 1}`);

        const organizedData = days.map(day => {
          return [
            day,
            ...periods.map(period => {
              const schedule = data?.find(
                item => item.day === day && `Period ${item.period.trim()}` === period
              );
              return schedule ? `${schedule.courseName}\n${schedule.roomName}` : '';
            })
          ];
        });

        // Simulate multiple sets of timetable data
        const multipleTables = [organizedData, organizedData]; // Add more arrays if you have more data sets

        setTableData(multipleTables);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetableData();
  }, []);

  const handleDownload = async () => {
    if (tableData.length) {
      const csvData = convertToCSV(tableData.flat());
      const fileUri = FileSystem.documentDirectory + 'tableData.csv';

      await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8 });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert('Sharing is not available on this device');
      }
    }
  };

  const renderTable = ({ item }) => (
    <View style={styles.tableContainer}>
          
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={styles.tableBorder}>
            <Row data={['Day', 'Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6', 'Period 7', 'Period 8', 'Period 9', 'Period 10']} style={styles.head} textStyle={styles.text} />
            <Rows data={item} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <AntDesign name="arrowleft" size={34} color="black" style={styles.backIcon} onPress={() => router.back()} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <FlatList
            data={tableData}
            renderItem={renderTable}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Download Table" onPress={handleDownload} style={styles.downloadButton} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  loadingContainer: {
    marginTop: 200,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 70, // To ensure the flatlist is not hidden behind the button
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginLeft: 20,
    marginRight: 20
  },
});