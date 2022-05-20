<template>
    <v-card class="mx-auto" max-width="55rem">
        <v-card-title>
            新規ユーザー登録
        </v-card-title>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
            >
                <v-text-field
                    v-model="name"
                    :counter="20"
                    :rules="nameRules"
                    label="ユーザー名"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    type="email"
                    :rules="emailRules"
                    label="メールアドレス"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    type="password"
                    :rules="passwordRules"
                    label="パスワード"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="passwordConfirmation"
                    type="password"
                    :rules="passwordConfirmationRules.concat(confirmPasswordRules)"
                    label="パスワード確認"
                    required
                ></v-text-field>

                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="register"
                >
                    登録
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Register",
    data: () => ({
        valid: true,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        nameRules: [
            v => !!v || '名前は必須です',
            v => (v && v.length <= 20) || '名前は20文字以内で入力してください',
        ],
        emailRules: [
            v => !!v || 'メールアドレスは必須です',
            v => /.+@.+\..+/.test(v) || 'メールアドレスは有効な値を使用してください',
            v => (v && v.length <= 100) || 'メールアドレスは100文字以内で入力してください',
        ],
        passwordRules: [
            v => !!v || 'パスワードは必須です',
            v => (v && v.length <= 255) || 'パスワードは100文字以内で入力してください',
            v => /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i.test(v) || 'パスワードは半角英数字を組み合わせて8文字以上入力してください',
        ],
        passwordConfirmationRules: [
            v => !!v || 'パスワード確認は必須です',
            v => (v && v.length <= 255) || 'パスワード確認は100文字以内で入力してください',
            v => /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i.test(v) || 'パスワード確認は半角英数字を組み合わせて8文字以上入力してください',
        ],
    }),
    computed: {
        confirmPasswordRules(){
            return () => (this.password === this.passwordConfirmation) || 'パスワードが確認用の値と違います'
        },
    },
    methods: {
        register () {
            if(this.$refs.form.validate()){
                this.$store.commit('global/setLoading',true);
                this.$store.dispatch('auth/register',{
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                }).then(res=>{
                    this.$toasted.success('ユーザーを作成しました');
                    this.$router.push('/login');
                }).catch(err=>{
                    this.$toasted.error('ユーザーの作成に失敗しました');
                }).finally(()=>{
                    this.$store.commit('global/setLoading',false);
                });
            }
        },
    },
}
</script>

<style scoped>

</style>
