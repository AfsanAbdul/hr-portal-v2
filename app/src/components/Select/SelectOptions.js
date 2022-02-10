/*-----------------employee------------------*/
export const familyConditionOptions = [
    {value: "MARRIED", label: "Evli"},
    {value: 'SINGLE', label: 'Subay'},
    {value: 'WIDOW', label: 'Dul'},
    {value: 'DIVORCED', label: 'Boşanmış'},
];

export const serialNumberOptions = [
    {value: 'AZE', label: 'AZE'},
    {value: 'AA', label: 'AA'},
    {value: 'MYİ', label: 'MYİ'},
]

export const educationTypeOptions = [
    {value: "VISUAL", label: "Əyani"},
    {value: 'CORRESPONDENCE', label: 'Qiyabi'},
];

export const driverLicenceOptions = [
    {value: 'A', label: "A"},
    {value: 'B', label: "B"},
    {value: 'C', label: "C"},
    {value: 'D', label: "D"},
]

export const genderOptions = [
    {value: 'MALE', label: "Kişi"},
    {value: 'FEMALE', label: "Qadın"},
    {value: 'NON', label: "Tələb yoxdur"},
]

export const bloodTypeOptions = [
    {value: "ONE_PLUS", label: 'O(I)RH+'},
    {value: "TWO_PLUS", label: 'A(II)RH+'},
    {value: "THREE_PLUS", label: 'B(III)RH+'},
    {value: "FOUR_PLUS", label: 'AB(IV)RH+'},
    {value: "ONE_MINUS", label: 'O(I)RH-'},
    {value: "TWO_MINUS", label: 'A(II)RH-'},
    {value: "THREE_MINUS", label: 'B(III)RH-'},
    {value: "FOUR_MINUS", label: 'AB(IV)RH-'},
];

export const militaryOptions = [
    {value: "MILITARY_SUCCESSFULLY", label: 'Hərbi mükəlləfiyyətli'},
    {value: "UNFIT", label: 'Yararsız'},
    {value: "LIMITED_USEFUL", label: 'Məhdud yararlı'},
    {value: "MILITARY_DATE", label: 'Hərbidə olma tarixi'},
];

export const relationTypeOptions = [
    {value: "FATHER", label: 'Ata'},
    {value: "MOTHER", label: 'Ana'},
    {value: "SISTER", label: 'Bacı'},
    {value: "BROTHER", label: 'Qardaş'},
    {value: "WIFE", label: 'Həyat yoldaşı'},
    {value: "SON", label: 'Oğul'},
    {value: "DAUGHTER", label: 'Qız'},
];

export const eduDegreeOptions = [
    {value: "BACHELOR", label: 'Bakalavr təhsili'},
    {value: "MASTER", label: 'Magistr təhsili'},
    {value: "DOCTORAL", label: 'Doktorantura təhsili'},
];

export const quota = [
    {value: "QUOTA_1", label: '20 yaşadək gənc'},
    {value: "QUOTA_2", label: 'Yetkinlik yaşına çatmamış uşaqları tərbiyə edən tək və çoxuşaqlı valideynlər'},
    {value: "QUOTA_3", label: 'Sağlamlıq imkanları məhdud uşaqları tərbiyə edən valideynlər'},
    {value: "QUOTA_4", label: 'Pensiya yaşına 2 ildən az qalmış şəxslər'},
    {value: "QUOTA_5", label: 'Əlillər və ya sağlamlıq imkanları məhdud 18 yaşınadək şəxslər'},
    {value: "QUOTA_6", label: 'Cəzaçəkmə yerlərindən azad edilmiş vətəndaşlar'},
    {value: "QUOTA_7", label: 'Məcburi köçkünlər'},
    {value: "QUOTA_8", label: 'Müharibə veteranları'},
    {value: "QUOTA_9", label: 'Şəhid ailələri'},
];

export const businessOptions = [
    {value: "EXTERNAL", label: 'Xarici'},
    {value: "INTERNAL", label: 'Daxili'},
];

export const jobStatusOptions = [
    {value: 'NEW', label: 'Yeni işçi'},
    {value: 'IN', label: 'İşləyir'},
    {value: 'OUT', label: 'Çıxarılıb'},
]

export const jobStatuses = {
    'IN': 'işləyir',
    'OUT': 'çıxarılıb',
    'NEW': 'yeni işçi'
};

export const statuses = {
    'Təsdiq gözləyir': 'pending',
    'Təsdiqlənib': 'confirmed',
    'Ləğv edildi': 'cancelled',
    'Hesablandı': 'done'
};

export const sicknessStatuses = {
    'Açıq': 'OPEN',
    'Bağlı': 'CLOSE',
};

/*--------------------------------------salary---------------------------------*/

export const monthOptions = [
    {value: 1, label: 'January'},
    {value: 2, label: 'February'},
    {value: 3, label: 'March'},
    {value: 4, label: 'April'},
    {value: 5, label: 'May'},
    {value: 6, label: 'June'},
    {value: 7, label: 'July'},
    {value: 8, label: 'August'},
    {value: 9, label: 'September'},
    {value: 10, label: 'October'},
    {value: 11, label: 'November'},
    {value: 12, label: 'December'},
]

export const vacancyOptions = [
    {value: 'mainSalary', label: 'Vəzifə maaşı'},
    {value: 'individualAddition', label: 'Fərdi əlavə'},
    {value: 'conditionalAddition', label: 'Fərdi əlavə %'},
]

export const productionOptions = [
    {value: 'jobDayCount', label: 'Norma iş gün'},
    {value: '', label: 'Norma iş saatı'},
]

export const calculationOptions = [
    {value: 'mainSalaryResult', label: 'Hesablanmış əmək haqqı (Tarif vəzifə maaşına görə)'},
    {value: 'individualAdditionResult', label: 'Fərdi əlavə (Fix məbləğ)'},
    {value: 'conditionalAdditionResult', label: 'Fərdi əlavə %'},
    {value: 'conditionalAddition', label: 'İş şəraitinə görə əlavə'},
    {value: '', label: 'Orta aylıq əmək haqqın saxlanılması'},
    {value: 'educationVacationPay', label: 'Təhsil məzuniyyəti'},
    {value: '', label: 'Əmək məzuniyyəti'},
    {value: 'overtimeHours', label: 'Normadan artıq saatların sayı'},
    {value: 'overtimeAmount', label: 'Normadan artıq saat'},
    {value: 'nightHours', label: 'Gecə saatların sayı'},
    {value: 'nightAmount', label: 'Gecə saatı'},
    {value: 'eveningHours', label: 'Axşam saatı sayı'},
    {value: '', label: 'Axşam saatı '},
    {value: 'overtimeHolidayHours', label: 'Bayram saatı (Normadan artıq) sayı'},
    {value: 'overtimeHolidayAmount', label: 'Bayram saatı (Normadan artıq)'},
    {value: 'holidayHours', label: 'Bayram saatı (Norma daxili) sayı'},
    {value: 'holidayAmount', label: 'Bayram saatı (Norma daxili)'},
    {value: 'offDayCount', label: 'Bayram və istirahət günü işə çıxma (Günlərin sayı)'},
    {value: 'offDayAmount', label: 'Bayram və istirahət günü işə çıxma'},
    {value: '', label: 'Müvəqqəti həvalə(Maaş fərqi)'},
    {value: '', label: 'İstifadə edilməmiş məzuniyyət günlərinə görə kompensasiya'},
    {value: '', label: 'Müvəqqəti həvalə(%)'},
    {value: '', label: 'İxtisara salınmaya görə ödənişlər'},
    {value: '', label: 'Maddi yardım '},
    {value: '', label: 'Maddi yardım (ölümlə əlaqədar) '},
    {value: '', label: 'Maddi yardım (Təqaüdə gedənlər) '},
    {value: '', label: 'Mükafat'},
    {value: '', label: 'Mükafat Bayram günü ilə əlaqdəar'},
    {value: '', label: 'Yemək pulu'},
    {value: '', label: 'Xəstəlik vərəqəsi(DSMF tərəfindən)'},
    {value: '', label: 'Xəstəlik vərəqəsi(Liman tərəfindən)'},
    {value: 'totalResult', label: 'Cəmi  hesablanıb'},
]

export const taxOptions = [
    {value: 'discountAmount', label: 'Güzəşt Məbləği'},
    {value: 'hysPASA', label: 'PAŞA HYS'},
    {value: 'forIncomingTax', label: 'Gəlir vergisinə cəlb olunan hissəsi'},
]

export const exemptionOptions = [
    {value: 'incomingTax', label: 'Gəlir vergisi'},
    {value: 'dsmfTax', label: 'M.D.S.S 3%'},
    {value: 'unemploymentTax', label: 'İşsizlik 0,5%'},
    {value: 'medicalInsuranceTax', label: 'İTS 2%'},
    {value: 'hysTax', label: 'Limançı 2%'},
    {value: '', label: 'Paşa HYS'},
    {value: 'totalTax', label: 'Cəmi tutulub'},
]

export const netExemptionOptions = [
    {value: '', label: 'Aliment (Fix)'},
    {value: '', label: 'Aliment %'},
    {value: '', label: 'Kredit %'},
    {value: '', label: 'Şəxsi borc (Fix)'},
    {value: '', label: 'Cərimə %'},
    {value: '', label: 'Yap (Fix)'},
    {value: '', label: 'Ödənilmiş məz'},
    {value: '', label: 'Ödənilmiş avans'},
    {value: '', label: 'Dsmf tərəfindən ödənilmiş XV'},
]

export const employerPayOptions = [
    {value: '', label: 'M.D.S.S 22%'},
    {value: '', label: 'İşsizlik 0,5%'},
    {value: '', label: 'İTS 2%'},
    {value: '', label: 'Limançı 1%'},
]

export const cols = [
    {value: 'fullName', label: 'S.A.A'},
    {value: 'workedDayCount', label: 'Faktiki iş günü'},
    {value: 'net', label: 'Net'},
    {value: 'xsa', label: 'Plastik Karta köçürülən məbləğ'},
]

/*---------------------staff------------------------*/

export const evaluationOptions = [
    {value: 'BEST', label: 'Əla'},
    {value: 'MIDDLE', label: 'Orta'},
    {value: 'GOOD', label: 'Yaxşı'}
];

export const educationDegreeOptions = [
    {value: 'MIDDLE', label: "Orta təhsil"},
    {value: 'MIDDLE_SPECIAL', label: "Orta ixtisas təhsili"},
    {value: 'PROFESSION', label: "Peşə təhsili"},
    {value: 'BACHELOR', label: "Bakalavr təhsili"},
    {value: 'MASTER', label: "Magistratura təhsili"},
    {value: 'DOCTORAL', label: "Doktorantura təhsili"},
]

export const options = [
    {value: 1, label: 'Bəli'},
    {value: 0, label: 'Xeyr'}
];

export const workConditionOptions = [
    {value: 'HARMFUL', label: 'Zərərli'},
    {value: 'HARMLESS', label: 'Zərərsiz'}
];

export const workModeOptions = [
    {value: 'DAILY', label: 'Gündəlik'},
    {value: 'ALTERNATELY', label: 'Növbəli'},
]

export const vacancyCategoryOptions = [
    {value: 'LEADER', label: 'Rəhbər'},
    {value: 'ENGINEER', label: 'Mütəxəssis'},
    {value: 'TECHNICAL_EXECUTOR', label: 'Texniki icraçı'},
    {value: 'WORKER', label: 'Fəhlə'},
]

export const workPlaceOptions = [
    {value: 'WORK_PLACE_1', label: 'Bakı inzibati bina'},
    {value: 'WORK_PLACE_2', label: 'Dəniz vağzalı'},
    {value: 'WORK_PLACE_3', label: 'Dübəndi terminalı'},
    {value: 'WORK_PLACE_4', label: 'Qaradağ anbarı'},
    {value: 'WORK_PLACE_5', label: 'Ələt'},
    {value: 'WORK_PLACE_6', label: 'Astara'},
]

export const vacancyLimitOptions = [
    {value: 'EMPTY', label: 'Boş'},
    {value: 'FULL', label: 'Dolu'},
]

export const disciplineOptions = [
    {value: "REPRIMAND", label: "Töhmət"},
    {value: "SEVERE_REPRIMAND ", label: "Şiddətli töhmət"},
];

export const jobTimeOptions = [
    {value: 'PART_TIME', label: 'Tam'},
    {value: 'FULL_TIME', label: 'Natamam'},
]

export const vacationTypeOptions = [
    {value: 'MAIN', label: 'Əsas məzuniyyət'},
    {value: 'EXPERIENCE', label: 'Staja görə əlavə məz.'},
    {value: 'CONDITIONAL', label: ' Əmək şəraitinə görə əlavə məz.'},
    {value: 'AGREEMENT', label: 'Kollektiv müqaviləyə əsasən məz.'},
    {value: 'CHILD', label: 'Uşağa görə'},
    {value: 'DEBT', label: 'Borc'},
]

export const jobTypeOptions = [
    {value: 'MAIN', label: 'Əsas iş yeri'},
    {value: 'ADDITIONAL', label: 'Əlavə iş yeri'},
]

export const statusOptions = [
    {value: 'PENDING', label: "Təsdiq gözləyir"},
    {value: 'APPROVED', label: "Təsdiqlənib"},
    {value: 'DONE', label: "Hesablandı"},
    {value: 'REJECTED', label: "Ləğv edildi"},
];

export const cityTypeOptions = [
    {value: 'DOMESTIC', label: 'Ölkədaxili'},
    {value: 'ABROAD', label: 'Ölkəxarici'}
]

