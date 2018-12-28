export class DATA {
    public static TOPICS: any[] = [
        {
            "title": "Thị trường TP. HCM"
        },
        {
            "title": "Đất Phú Quốc"
        },
        {
            "title": "Đặc khu kinh tế"
        },
        {
            "title": "Căn hộ siêu sang quận 2"
        },        
        {
            "title": "Tái định cư khu Tân Tạo"
        }
    ]
    public static districts: string[] = [
        'Quận 1', 
        'Quận 2', 
        'Quận 3',
        'Quận 4',
        'Quận 5',
        'Bình Thạnh',
        'Hóc Môn',
        'Củ Chỉ',
        'Bình Tân',
        'Gò Vấp',
        'Thủ Đức'
      ];
    
    public static cities: any[] = [
        {id: 1, name: 'Hồ Chí Minh'}
    ];
    
    public static wards: string[] = [
        'Phường 2',
        'Phường 3',
        'Phường 4',
        'Phường 5',
        'Phường 6',
    ];
    
    public static types: number[] = [
        0,
        1,
        2
      ];

    public static directions: any[] = [
        {value: 1, name: 'Đông'},
        {value: 2, name: 'Tây'},
        {value: 3, name: 'Nam'},
        {value: 4, name: 'Bắc'},
        {value: 13, name: 'Đông Nam'},
        {value: 14, name: 'Đông Bắc'},
        {value: 23, name: 'Tây Nam'},
        {value: 24, name: 'Tây Bắc'},
      ];
    
    public static floors: any[] = [
        {value: 0, label: 'Chỉ tầng trệt'},
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
    ]
    
    public static prices: any[] = [
        {value: 0, label: 'Tất cả'},
        {value: 2, label: '< 2 tỷ'},
        {value: 4, label: '< 4 tỷ'},
        {value: 5, label: '< 6 tỷ'},
        {value: 8, label: '< 8 tỷ'},
        {value: 10, label: '< 10 tỷ'},
        {value: 11, label: '10 tỷ +'},
    ]
}