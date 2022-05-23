<template>
    <v-card class="mx-auto" max-width="55rem">
        <v-card-title>
            ログイン
        </v-card-title>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
            >
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    type="email"
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

                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="login"
                >
                    ログイン
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        valid: true,
        email: '',
        password: '',
        emailRules: [
            v => !!v || 'メールアドレスは必須です',
            v => /.+@.+\..+/.test(v) || 'メールアドレスは有効な値を使用してください',
            v => (v && v.length <= 100) || 'メールアドレスは100文字以内で入力してください',
        ],
        passwordRules: [
            v => !!v || 'パスワードは必須です',
            v => (v && v.length <= 255) || 'パスワードは100文字以内で入力してください',
        ],
    }),
    methods: {
        async login () {
            if(this.$refs.form.validate()){
                this.$store.commit('global/setLoading',true);
                await this.$store.dispatch('auth/login',{
                    email: this.email,
                    password: this.password,
                }).then(res=>{
                    this.$toasted.success('ログインに成功しました');
                    this.$router.push('/');
                }).catch(err=>{
                    this.$toasted.error(this.$helpers.getErrorMsg(err,'ログインに失敗しました'));
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
