import moment from 'moment';

export const Common = {
  dateFormatViewString: `DD-MM-yyyy HH:mm`,
  dateTimeFormatView: function (value: Date) {
    return moment(value).format('DD-MM-yyyy HH:mm');
  },
  dateFomatSubmit: function (value: Date) {
    return moment(value).format('yyyy-MM-DDTHH:mm');
  },
  dateFormatView: function (value: Date) {
    return moment(value).format('DD-MM-yyyy');
  },
};

export const fileUtils = {
  base64ToArrayBuffer: function (base64: any) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  },
};

export const indicatorUtils = {
  indicators: [
    '1. Số KH HIV dương tính',
    '2. Số KH có kết luận nhiễm mới',
    '3. Số KH HIV dương tính được chuyển gửi điều trị thành công',
    '4. Số KH nhận ít nhất 1 dịch vụ trong kỳ',
    '5. Số KH mới điều trị lần đầu',
    '6. Tỷ lệ KH điều trị liên tục ≥ 3 tháng',
    '7. Số BN đang điều trị ARV',
    '8. Số BN mới điều trị ARV',
    '9. Số BN được cấp thuốc nhiều tháng',
    '10. Tỷ lệ BN có TLVR ≥ 50 bản sao/ml',
    '11. Số BN trễ hẹn điều trị',
    '12. Số BN điều trị dự phòng lao',
    '13. Tỉ lệ cảnh báo số lượng thuốc đủ cấp phát trong quý tiếp theo',
    '14. Tỉ lệ đánh giá hiệu quả dự trù và quản lý kho',
    '15. Số BN hiện nhận thuốc ARV qua BHYT',
    '16. Số BN điều trị ARV không được chi trả qua nguồn BHYT',
    '17. Số BN được cấp thuốc qua BHYT ≥ 3 tháng (84 ngày)',
    '18. Số BN XN TLVR do BHYT chi trả',
  ],
  getAll: () => {
    return indicatorUtils.indicators;
  },

  get: (indicatorCode: number) => {
    return indicatorUtils.indicators[indicatorCode];
  },
};
