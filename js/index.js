//fungsi untuk menghandle pemilihan jenis kelamin
function handleGenderClick(){
    let gender = 'Pria'
    const radiosGender = document.querySelectorAll('input[type=radio]')
    radiosGender[1].addEventListener('click', () => {
        radiosGender[0].checked = false
    })
    
    radiosGender[0].addEventListener('click', () => {
        radiosGender[1].checked = false
    })
}

// Fungsi untuk menghandle perubahan dan validasi pada input
function handleInputChange(){
    handleGenderClick() //memanggil pemilihan jenis kelamin

    // Declare local variable yang dibutuhkan
    const inputContainer = document.querySelectorAll('.input-container')
    const pattern = /[A-Za-z`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/; //pattern untuk validasi user input
    const inputs = document.querySelectorAll('input[type=text]')
    const submit = document.querySelector('.calc')

    //Melakukan looping dengan foreach pada setiap input yang bertipe text
    inputs.forEach((input, index) => {

        //melakukan validasi 
        input.addEventListener('input', (e) => {
            if(pattern.test(e.target.value)){
                inputContainer[index].style.border = '1px solid red'
                submit.disabled = true
            }else{
                inputContainer[index].style.border = '1px solid lightgrey'
                submit.disabled = false
            }
        })
    })
}

//Fungsi untuk menghandle submit input
function handleSubmitClick(){
    handleInputChange() //memanggil fungsi untuk menghandle perubahan input

    // Declare local variable yang dibutuhkan
    const bodyWeight = document.querySelector('#input-bb')
    const age = document.querySelector('#input-usia')
    const bodyHeight = document.querySelector('#input-tb')
    const submit = document.querySelector('.calc')
    const result = document.querySelector('.result-number')
    const radiosGender = document.querySelectorAll('input[type=radio]')
    const age_gender = document.querySelector('.data-ag')
    const textCategory = document.querySelectorAll('.weight-category')

    

    //Beberapa aksi akan terjadi ketika tombol hitung diklik
    submit.addEventListener('click', (e) => {
        e.preventDefault() //Mencegah default action dari button submit

        //validasi input kosong
        if(bodyWeight.value === '' || age.value === '' || bodyHeight.value === ''){
            alert('Input tidak boleh kosong')
            return
        }

        const resultFormula = (parseInt(bodyWeight.value) / ((parseInt(bodyHeight.value) / 100) ** 2)).toFixed(1) //Hasil dari rumus perhitungan
        const gender = radiosGender[0].checked === true ? 'Pria' : 'Wanita' //validasi input gender
        result.textContent = resultFormula === 'NaN' ? alert('Input error : memasukkan selain angka') : resultFormula //rumus bmi + validasi tambahan
        age_gender.textContent = `(Data : ${gender} / ${age.value} tahun)` //menampilkan data usia dan jenis kelamin

        const [range, category] = handleResultCategory(resultFormula) //Destructuring return yang dihasilkan oleh fungsi, berupa array

        // validasi lagi...
        if(category !== undefined){
            textCategory.forEach((each, index) => each.textContent = index === 0 || index === 2 ? `${category}` : `Anda termasuk ${category}`) //Menampilkan category yang telah di filter ke dalam setiap class .weight-category
            document.querySelector('.range').textContent = ` ${range}` //Menampilkan text range category berat badan

            // Menghindari button yang harus diklik dua kali agar pindahh di mobile device
            setTimeout(() => {
                window.location = '#Result' //pindah ke bagian result
            }, 200)
        }
    })
}


//Memvalidasi category berdasarkan hasil nilai perhitungan
function handleResultCategory(resultValue){
    // Declare local variable yang dibutuhkan
    let category = []

    //Pengkondisian dengan switch
    switch(true){
        case resultValue < 18.5:
            category.push('kurang dari angka 18.5')
            category.push('Kekurangan berat badan')
            break
        case resultValue >= 18.5 && resultValue <= 24.9 :
            category.push('ada diangka 18.5 - 24.9')
            category.push('Normal (ideal)')
            break
        case resultValue >= 25 && resultValue <= 29.9:
            category.push('ada diangka 25 - 29.9')
            category.push('Berat Berlebih')
            break
        case resultValue >= 30:
            category.push('lebih dari angka 30')
            category.push('Obesitas')
            break
        default:
            category = '-'
            break
    }
    return category //Mengembalikan category dan text nya dalam bentuk array, agar bisa dilakukan destructuring
}

// Fungsi untuk menghandle pergantian ke toggle menu di mobile device
function handleMobileMenu(){
    const rightNav = document.querySelector('.right-nav')
    const toggleMenu = document.querySelector('.toggle-mobile')
    const mobileMenu = document.querySelector('.menu-mobile')

    const screen = window.matchMedia('(max-width: 600px)')

    function screenChange(screen){
        if(screen.matches){
            rightNav.style.display = 'none'
            toggleMenu.style.display = 'flex'
        }else{
            rightNav.style.display = 'flex'
            toggleMenu.style.display = 'none'
            mobileMenu.style.top = '-51rem' //Menghindari bug mobile menu yg masih muncul ketika ukuran layar membesar
        }
    }

    screenChange(screen)

    //Tracking perubahan nilai screen
    screen.addEventListener('change', screenChange)
}

// Fungsi untuk memunculkan menu ketika icon toggle menu di klik
function handleToggleClick(){
    const iconMenu = document.querySelector('.toggle-menu')
    const menuMobile = document.querySelector('.menu-mobile')
    
    //Fungsi tutup menu, agar bisa digunakan kembali
    const closeMenu = () => {
            menuMobile.style.top = '-51rem'
            document.body.style.backgroundColor = 'var(--background)'
            iconMenu.setAttribute('src', './images/toggle-menu.svg')
    }
    //Event listener click
    iconMenu.addEventListener('click', () => {
        if(menuMobile.offsetTop == '-816'){
            menuMobile.style.top = '4rem'
            document.body.style.backgroundColor = 'lightgrey'
            iconMenu.setAttribute('src', './images/close-icon.svg')
        }else{
            closeMenu()
        }
    })

    return [menuMobile, iconMenu, closeMenu]
}

//Side effect menu tertutup ketika salah satu menu diklik
function handleMobileMenuClick(){
    const anchorMobile = document.querySelectorAll('.mobile-a')
    const [menuMobile, iconMenu, closeMenu] = handleToggleClick()

    anchorMobile.forEach(each => {
        each.addEventListener('click', closeMenu)
    })

}

//Memanggil fungsi mobile menu
handleMobileMenu()

//Memanggil fungsi icon menu mobile click
handleToggleClick()

//Memanggil fungsi klik mobile menu 
handleMobileMenuClick()

//Memanggil fungsi submit yang berisi fungsi button hitung klik <-- handle perubahan input <-- pemilihan jenis kelamin
handleSubmitClick()




