interface IPCData {
  ipc_class: string;
  count: number;
}

export function leadingIPCClass(data: IPCData[]): string {
  data.sort((a, b) => b.count - a.count);
  // Get the data for the IPC class with the highest count
  const mostFocusedArea = data[0];

  // Construct the sentence
  const sentence = `IPC Class ${mostFocusedArea.ipc_class} leads with ${mostFocusedArea.count} patent applications, marking it as the most focused area of innovation.`;

  return sentence;
}

export function comparisonOfCPCClassificationsOverTime(data: IPCData[]) {
  data.sort((a, b) => b.count - a.count);
  // Get the data for the IPC class with the highest count
  const mostFocusedArea = data[0];

  // Construct the sentence
  const sentence = `IPC Class ${mostFocusedArea.ipc_class} leads with ${mostFocusedArea.count} patent applications, marking it as the most focused area of innovation.`;

  return sentence;
}
