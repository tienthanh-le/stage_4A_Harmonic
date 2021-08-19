#include "finding.h"

namespace demo
{

    using v8::Array;
    using v8::Context;
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::FunctionTemplate;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::ObjectTemplate;
    using v8::String;
    using v8::Value;

    MyObject::MyObject(double id, std::string value) : id_(id), value_(value)
    {
    }

    MyObject::~MyObject()
    {
    }

    void MyObject::Init(Local<Object> exports)
    {
        Isolate *isolate = exports->GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        Local<ObjectTemplate> addon_data_tpl = ObjectTemplate::New(isolate);
        addon_data_tpl->SetInternalFieldCount(2); // 1(2) field for the MyObject::New()
        Local<Object> addon_data =
            addon_data_tpl->NewInstance(context).ToLocalChecked();

        // Prepare constructor template
        Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New, addon_data);
        tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
        tpl->InstanceTemplate()->SetInternalFieldCount(2); // 1(2) field for the MyObject::New()

        // Prototype
        NODE_SET_PROTOTYPE_METHOD(tpl, "showResult", ShowResult);
        //NODE_SET_PROTOTYPE_METHOD(tpl, "find_id", FindFromID);

        Local<Function> constructor = tpl->GetFunction(context).ToLocalChecked();
        addon_data->SetInternalField(0, constructor);
        exports->Set(context, String::NewFromUtf8(isolate, "MyObject").ToLocalChecked(),
                     constructor)
            .FromJust();
    }

    void MyObject::New(const FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();

        if (args.IsConstructCall())
        {
            // args[0]
            double id = args[0]->IsUndefined()
                            ? 0
                            : args[0]->NumberValue(context).FromMaybe(0);

            // // args[1]: Convert std::string to v8::string
            // Try convert args[1] type to *char in order to match demanded type for v8::Object::Set
            // -> Failed , still fixing

            Local<String> value;
            value = args[0].As<String>();

            char *charValue = new char[1000];
            (*value)->WriteUtf8(isolate, charValue);

            static std::string stringValue;
            stringValue.assign(charValue);

            // Invoked as constructor: `new MyObject(...)`
            // Array Declare
            unsigned int n = 1;
            Local<Array> arr = Array::New(isolate, 1);
            // Array Assignment
            arr->Set(context, 0, Number::New(isolate, id));
            arr->Set(context, 1, charValue);
            delete charValue;

            // MyObject *obj = new MyObject(arr);
            // obj->Wrap(args.This());
            // args.GetReturnValue().Set(args.This());

            args.GetReturnValue().Set(arr);
        }
        else
        {
            // Not yet modified for arg[1]
            // Invoked as plain function `MyObject(...)`, turn into construct call.
            const int argc = 1;
            Local<Value> argv[argc] = {args[0]};
            Local<Function> cons =
                args.Data().As<Object>()->GetInternalField(0).As<Function>();
            Local<Object> result =
                cons->NewInstance(context, argc, argv).ToLocalChecked();
            args.GetReturnValue().Set(result);
        }
    }

    void MyObject::ShowResult(const FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();

        MyObject *obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
        //obj->id_ += 1;

        args.GetReturnValue().Set(Number::New(isolate, obj->id_));
    }
    ////////////////////////////////////////////////////////////////////////////

    // void MyObject::FindFromId(const FunctionCallbackInfo<Value> &args)
    // {
    //     Isolate *isolate = args.GetIsolate();

    //     MyObject *obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
    //     // std::string array[10];
    //     //std::string res_array[10] = obj->value_;

    //     //////////////////////////////////////////////////
    //     // std::string *res = std::find(std::begin(obj->value_), std::end(obj->value_, args[0]);
    //     // std::string *res = std::find(std::begin(obj->value_), std::end(obj->value_), args[0]);
    //     // if (res != std::end(obj->value_))
    //     // {
    //     //     obj->value_ = &res;
    //     // }
    //     // else
    //     // {
    //     //     //Not found - Pass the error to JS (~throw)
    //     //     isolate->ThrowException(Exception::TypeError(
    //     //         String::NewFromUtf8(isolate,
    //     //                             "Exception error happened in wrapper function")
    //     //             .ToLocalChecked()));
    //     // };
    //     ////////////////////////////////////////////////////
    //     // Convert std::string to char*
    //     std::string str = obj->value_;
    //     char *cstr = new char[str.length() + 1];
    //     strcpy(cstr, str.c_str());

    //     // args.GetReturnValue()
    //     //     .Set(String::NewFromUtf8(isolate, cstr));

    //     args.GetReturnValue().SetEmptyString();

    //     delete[] cstr;
    // }

} // namespace demo