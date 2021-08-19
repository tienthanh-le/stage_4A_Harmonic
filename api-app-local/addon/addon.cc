#include <napi.h>
#include <string>

static Napi::Boolean Compare(const Napi::CallbackInfo &info)
{
    //2 args input, verify if they're the same value
    Napi::Env env = info.Env();

    // Check the number of arguments passed.
    if (info.Length() != 2)
        throw Napi::Error::New(env, "Method 'Compare' must be taking 2 arguments");

    //Check the argument types
    if (!info[0].IsNumber() || !info[1].IsNumber())
        throw Napi::Error::New(env, "Method 'Compare' must be taking number value arguments");

    return Napi::Boolean::New(env, info[0].ToNumber() == info[1].ToNumber());
}

static Napi::String GetData(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    std::string get_data = (std::string)info[0].ToString();

    return Napi::String::New(env, get_data);
}

static Napi::Array GenerateArray(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    // Check the argument types
    if (!info[0].IsNumber())
        throw Napi::Error::New(env, "Method 'Compare' must be taking number value arguments");

    return Napi::Array::New(env, (int)info[0].ToNumber());
}

static Napi::Array GetData2(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    //std::string arr_map[3] = {"elem0", std::to_string(1), "elem2"};
    // char arr_map[3] = {"0", "1", "2"};
    int arr_map[3] = {1, 2, 3};
    Napi::Array arr = Napi::Array::New(env, 3);

    int i = 0;
    for ((uint32_t)i; i != 3; i++)
    {
        arr[i] = Napi::String::New(env, std::to_string(arr_map[i]));
    }
    arr[(uint32_t)1] = Napi::String::New(env, std::to_string(arr_map[(uint32_t)1]));
    return arr;
}

static Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "compare"),
                Napi::Function::New(env, Compare));

    exports.Set(Napi::String::New(env, "getData"),
                Napi::Function::New(env, GetData));

    exports.Set(Napi::String::New(env, "genArray"),
                Napi::Function::New(env, GenerateArray));

    exports.Set(Napi::String::New(env, "getData2"),
                Napi::Function::New(env, GetData2));
    return exports;
}

NODE_API_MODULE(addon, Init)
