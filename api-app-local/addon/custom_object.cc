#include "custom_object.h"

ObjectWrapDemo::ObjectWrapDemo(const Napi::CallbackInfo &info)
    : ObjectWrap(info)
{
    Napi::Env env = info.Env();

    if (info.Length() != 1)
    {
        Napi::TypeError::New(env, "This object is expected to take 1 argument")
            .ThrowAsJavaScriptException();
        return;
    }

    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, "This object is expected to take string type argument")
            .ThrowAsJavaScriptException();
        return;
    }

    // for (unsigned i = 0; i < 3; i++)
    // {
    //     this->_arr[i] = info[0][i].As<Napi::String>().Utf8Value();
    // }
    // this->_arr = info[0].As<Napi::Array>;

    this->_data = info[0].As<Napi::String>().Utf8Value();
}

Napi::Value ObjectWrapDemo::CallString(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() != 1)
    {
        Napi::TypeError::New(env, "This object only takes 1 argument")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, "This object only takes string type argument")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::String name = info[0].As<Napi::String>();

    printf("Printf called arg %s\n", name.Utf8Value().c_str());
    printf("Instance's value created by New : %s\n", this->_data.c_str());

    return Napi::String::New(env, this->_data);
}

Napi::Value ObjectWrapDemo::GetLength(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() != 1)
    {
        Napi::TypeError::New(env, "This object only takes 1 argument entered as an array")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    //Adding check IsArray? for info[0]
    if (!info[0].IsArray())
    {
        Napi::TypeError::New(env, "This object is expected to take string type argument")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    //Perform operation
    Napi::Array arr = info[0].As<Napi::Array>();
    double arrSize = arr.Length();

    //printf("info[0][1]: %s\n", arr[0][1].Utf8Value().c_str());
    //arr.Get(0)

    return Napi::Number::New(env, arrSize);
}

Napi::Function ObjectWrapDemo::GetClass(Napi::Env env)
{
    return DefineClass(
        env,
        "ObjectWrapDemo",
        {
            ObjectWrapDemo::InstanceMethod("callStr", &ObjectWrapDemo::CallString),
            ObjectWrapDemo::InstanceMethod("getLength", &ObjectWrapDemo::GetLength),
        });
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    Napi::String name = Napi::String::New(env, "ObjectWrapDemo");
    exports.Set(name, ObjectWrapDemo::GetClass(env));
    return exports;
}

NODE_API_MODULE(addon, Init)